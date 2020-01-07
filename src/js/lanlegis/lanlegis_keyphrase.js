import React, {Component} from 'react';

class KeyPhrase extends Component{

    handleWordInPhrase(idx){
        if(this.props.mother_state.progress=='keyword_choosing'){
            // when the index is not included, add it into the selected_indexes
            if(this.props.mother_state.selected_indexes.indexOf(idx)==-1){
                var new_selected_indexes = this.props.mother_state.selected_indexes
                new_selected_indexes.push(parseInt(idx))
                this.props.mother_this.setState({selected_indexes:new_selected_indexes})
            }
            // if not, remove it from the selected_indexes
            else{
                var new_selected_indexes = this.props.mother_state.selected_indexes
                new_selected_indexes.splice(new_selected_indexes.indexOf(parseInt(idx)),1)
                this.props.mother_this.setState({selected_indexes:new_selected_indexes})
            }
        }

    }

    renderWords(words){
        var progress = this.props.mother_state.progress
        return words.map((word,idx) =>{
            // console.log(this)
            var chosen = (this.props.mother_state.selected_indexes.indexOf(idx)!=-1)
            var semantic_anno = (this.props.mother_state.progress=='semantics'&&idx==this.props.mother_state.selected_indexes[this.props.mother_state.progress_semantics])
            // console.log(chosen)
            var syntax_head_anno = false;
            var syntax_tail_anno = false;
            if (this.props.mother_state.progress=='syntax' && this.props.mother_state.syntax_candidates.length>0){

                var dep = this.props.mother_state.syntax_candidates[this.props.mother_state.progress_syntax];
                if (dep['head']==idx){
                    syntax_head_anno = true;
                }else if(dep['word']==idx){
                    syntax_tail_anno = true;
                }
            }
            console.log(syntax_head_anno, syntax_tail_anno, 'head, tail')
            return (
                <div key={'WordInPhrase_'+idx.toString()} className="WordInPhrase">
                    <div className={'WordInPhrase_Button '+((chosen&&!semantic_anno)?' WordInPhrase_Selected':' ')+((progress=='keyword_choosing')?' WordInPhrase_WordChoosing':' ')+((semantic_anno)?' WordInPhrase_CurrentAnno':' ')+((syntax_head_anno)?' WordInPhrase_SyntaxHead':' ')+((syntax_tail_anno)?' WordInPhrase_SyntaxTail':' ')} onClick={this.handleWordInPhrase.bind(this, idx)}>{word}</div>
                    <span className='WordInPhrase_StopWords'>{this.props.mother_state.stop_words[idx]}</span>
                </div>
                
            )
        });
    }


    render(){

        

        return (
            <div className='row fixedheight'>
                <div className="centered PhraseBox">
                    {this.renderWords(this.props.mother_state.words)}
                </div>
            </div>
        );
    }
}

export default KeyPhrase;