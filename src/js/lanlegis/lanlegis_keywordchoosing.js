import React, {Component} from 'react'

class KeywordChoosing extends Component{
    state = {}
    
    done_with_selecting(){
        var _this = this
        if(this.props.mother_state.selected_indexes.length!=0){
            var list_to_be_sorted = this.props.mother_state.selected_indexes
            list_to_be_sorted.sort(function(a,b){
                if (a < b) {
                    return -1;
                }
                if (b > a) {
                    return 1;
                }
                return 0;
            })
            console.log(list_to_be_sorted)
            this.props.mother_this.setState({progress:'semantics', selected_indexes:list_to_be_sorted})
            this.props.mother_this.initializeSemanticSearch(this.props.mother_state.words[parseInt(list_to_be_sorted[0])]);
            // console.log(this.props.mother_state)
            // console.log('yay')
        }else{
            alert("Please choose at least one word that contributes the toxicity of the sentence.")
        }
    }

    render(){
        return (<div className='btn centered fixedheight' onClick={this.done_with_selecting.bind(this)} style={{display:((this.props.mother_state.progress!='keyword_choosing')?'none':'block')}}>
            Done with selecting.    
        </div>)
       
    }
}

export default KeywordChoosing;