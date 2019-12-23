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