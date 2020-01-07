import React, {Component} from 'react';

class SemanticsPOS extends Component{
    state = {
        value: undefined,
    }

    renderPOSSelector(){
        return this.props.mother_state.pos_list.map((pos, idx)=>{
            var pos_full=''
            if(pos=='n'){
                pos_full='noun'
            }else if(pos=='v'){
                pos_full='verb'
            }else if(pos=='a'){
                pos_full='adjective'
            }else if(pos=='r'){
                pos_full='adverb'
            }else if(pos=='VERB'){
                pos_full='verb'
            }else if(pos=='NOUN'){
                pos_full='noun'
            }else if(pos=='ADJ'){
                pos_full='adjective'
            }else if(pos=='ADV'){
                pos_full='adverb'
            }else if(pos=='ADP'){
                pos_full= 'adposition'
            }else if(pos=='CONJ'){
                pos_full= 'conjunction'
            }else if(pos=='DET'){
                pos_full= 'determiner'
            }else if(pos=='NUM'){
                pos_full= 'numeral'
            }else if(pos=='PRON'){
                pos_full= 'pronoun'
            }else if(pos=='PRT'){
                pos_full= 'particle'
            }else if(pos=='X'){
                pos_full= 'other'
            }
            return (<div key={'pos_selection_'+pos}>
                <label>
                    <input type='radio' name='pos' value={pos} onChange={this.ValueChange.bind(this)}></input>
                    <span>{pos_full}</span>
                </label>
            </div>)
        })
    }

    ValueChange(e){
        this.setState({value:e.target.value})
    }

    check(){
        console.log(this.state.value)
        if(this.state.value!=undefined){
            this.props.mother_this.SelectPOS(this.state.value)
        }
    }

    render(){
        return (<div>
            <h6>Which type of higher level concept are you looking for?</h6>
            <div>
                {this.renderPOSSelector()}
            </div>
            <div className='btn' onClick={this.check.bind(this)}>Next</div>
        </div>)
    }
}

export default SemanticsPOS;