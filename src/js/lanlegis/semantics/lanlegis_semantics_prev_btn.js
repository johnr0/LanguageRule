import React, {Component} from 'react'

class SemanticsPrevBtn extends Component{

    handlePrev(){
        if(this.props.mother_state.progress_semantics==0 && (this.props.mother_state.pos==undefined || this.props.mother_state.pos_list.length<=1)){
            // go to the keyword choosing
            var progress='keyword_choosing'
            var pos_list=[]
            this.props.mother_this.setState({progress:progress, pos_list:pos_list, pos:undefined, init_query_result: undefined, query_result_list:[], hypernyms:[],})
        }else if(this.props.mother_state.pos==undefined || this.props.mother_state.pos_list.length<=1){
            // go to the previous word
            var snapshot_list = this.props.mother_state.semantic_snapshots
            var last_snapshot = snapshot_list.pop()

            this.props.mother_this.setState({
                progress_semantics: this.props.mother_state.progress_semantics-1,
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
        }else{
            // go to pos choosing stage
            var query_result_list = this.props.mother_state.query_result_list
            while(query_result_list.lengt>1){
                query_result_list.pop()
            }

            this.props.mother_this.setState({

                semantics_subprogress:'pos',
                cur_words: undefined,
                cur_idx: -1,

                word_trajectory: [],

                query_result_list: query_result_list,// pop till 1 element?

                hypernyms: [],
                chosen_examples:[],
                user_added_examples: [],
                example_search_list: [],
                example_search_dict: {},
                example_choosen_word: "",
                candidates_from_examples: [],
                empath_examples: [],
            })

        }
    }

    render(){
        return (<div style={{position:'absolute', bottom: '5px', right: '5px'}}>
            <span className='btn' onClick={this.handlePrev.bind(this)}>Prev</span>
        </div>)
    }
}

export default SemanticsPrevBtn;