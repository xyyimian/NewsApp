import React, { useState } from "react"
import AsyncSelect from 'react-select/lib/Async';
import _ from "lodash"
function SearchBox(props){

    const bing_key = '4d04d04e40264f9a8ea2c88fa1fbedee'

    function bingAutosuggest(query){
        var endpoint = "https://api.cognitive.microsoft.com/bing/v7.0/Suggestions";
        var request = new XMLHttpRequest();
        try {
            request.open('GET', endpoint + "?q=" + encodeURIComponent(query));
        } catch (error) {
            console.log(error);
            return false;
        }
        request.setRequestHeader("Ocp-Apim-Subscription-Key", bing_key);
        request.addEventListener('load', function() {
            if(this.status == 200){
                renderSearchResults(JSON.parse(this.responseText));

            }
            else{
                console.log(this.status)
                console.log(this.statusText)
            }
        })
        request.send();
        return false;
    }
    


    function renderSearchResults(results) {
        // setSchOpt(results.suggestionGroups[0].searchSuggestions.map((e, index) => {return {label: e.displayText, value: index}} ))
        schOptions = results.suggestionGroups[0].searchSuggestions.map((e, index) => {return {label: e.displayText, value: index}} )
    }
    // const [searchOptions, setSchOpt] = useState([])
    var schOptions = []
    /***************** */
    
    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (newValue) => { setInputValue(newValue)};
    
    
    
    const loadOptions = (inputValue, callback) => {
        if(!inputValue){
            return callback([ { label: 'No Match', value: 1 }]);
        }
        else{
            bingAutosuggest(inputValue);
            setTimeout( () => {return callback(schOptions)}, 500);
        }
    };


    return (
        <AsyncSelect 
            defaultOptions={[ { label: 'No Match', value: 1 }]}
            onChange={(e) => {props.searchReq(e)}}
            onInputChange={_.debounce(handleInputChange, 500)}
            placeholder={'Enter Keyword..'}
            loadOptions={_.debounce(loadOptions, 500)}
        />
    );
}

export default SearchBox;