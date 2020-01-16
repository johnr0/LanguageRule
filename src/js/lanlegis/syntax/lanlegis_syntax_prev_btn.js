import React, {Component} from 'react'

class SyntaxPrevBtn extends Component{

    handlePrev(){
        if(this.props.mother_state.progress_syntax==0 && this.props.mother_state.syntax_subprogress=='verify'){
            var snapshot_list = this.props.mother_state.semantic_snapshots
            var last_snapshot = snapshot_list.pop()

            this.props.mother_this.setState({
                progress: 'semantics',
                semantics_subprogress: last_snapshot['semantics_subprogress'],
                // this controls "output" pane, and can be the list
                cur_words: last_snapshot['cur_words'],
                    // cur_idx is the index of the current keyword in 
                    // when cur_idx is positive or 0, output will be visualized
                cur_idx: last_snapshot['cur_idx'],
                word_trajectory: last_snapshot['word_trajectory'],
                query_result_list: last_snapshot['query_result_list'],
                init_query_result: last_snapshot['init_query_result'],
                    // hypernyms of the currently selected word
                hypernyms: last_snapshot['hypernyms'],
                //list of words that is stored into database later
                chosen_examples: last_snapshot['chosen_examples'],
                user_added_examples: last_snapshot['user_added_examples'],
                example_search_list: last_snapshot['example_search_list'],
                example_search_dict: last_snapshot['example_search_dict'],
                example_choosen_word: last_snapshot['example_choosen_word'],
                candidates_from_examples: last_snapshot['candidates_from_examples'],
                semantic_snapshots: snapshot_list,
                empath_examples: last_snapshot['empath_examples'],
                pos: last_snapshot['pos'],
                pos_list: last_snapshot['pos_list']
            })
        }else if(this.props.mother_state.syntax_subprogress=='verify'){
            var input_dict = this.props.mother_state.syntax_relations[this.props.mother_state.syntax_relations.length-1]
            var inferred_dict = this.props.mother_state.syntax_candidates[this.props.mother_state.syntax_relations.length-1]
            var syntax_relations = this.props.mother_state.syntax_relations
            syntax_relations.pop()
            if(input_dict['head']==inferred_dict['head'] && input_dict['word']==inferred_dict['word'] && input_dict['dependency']==inferred_dict['dependency']){
                this.props.mother_this.setState({
                    syntax_subprogress: 'verify',
                    syntax_relations: syntax_relations,
                    progress_syntax: this.props.mother_state.progress_syntax-1,
                })
            }else{
                var head_switch=false;
                if(input_dict['head']==inferred_dict['word']){
                    head_switch=true;
                }
                this.props.mother_this.setState({
                    syntax_subprogress: 'exploration',
                    cur_selected_dep: input_dict['dependency'],
                    dependency_head_switch: head_switch,
                    syntax_relations: syntax_relations,
                    progress_syntax: this.props.mother_state.progress_syntax-1,
                })
            }
            

        }else if(this.props.mother_state.syntax_subprogress=='exploration'){
            this.props.mother_this.setState({
                syntax_subprogress: 'verify',
                cur_selected_dep: "",
                dependency_head_switch: false,
            })

        }
    }

    render(){
        return (<div style={{position:'absolute', bottom: '5px', right: '5px'}}>
            <span className='btn' onClick={this.handlePrev.bind(this)}>Prev</span>
        </div>)
    }
}

export default SyntaxPrevBtn