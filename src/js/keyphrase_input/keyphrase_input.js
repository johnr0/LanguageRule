import React, {Component} from 'react'
import axios from 'axios'

class KeyphraseInput extends Component{

    inputKeyphrase(){
        console.log(this.refs.phrase.value)
        if(this.refs.phrase.value.length==0){
            alert('Write something.')
        }else{
            axios.post('input_keyphrase', {phrase: this.refs.phrase.value})
            .then(res=>{
                console.log(res.data['keyphrase_id'])
            })
        }
    }

    render(){
        return (<div style={{textAlign:'center', margin: '20px'}}>
            <p></p>
            <div class="input-field col s6">
                <input id="phrase" type="text" class="validate" ref='phrase'/>
                <label for="phrase">Input the phrase to generate rule in the below:</label>
            </div>
            <div style={{margin:'auto', width:'fit-content'}}>
                <span className='btn' onClick={this.inputKeyphrase.bind(this)}>Done</span>
            </div>
        </div>)
    }
}

export default KeyphraseInput