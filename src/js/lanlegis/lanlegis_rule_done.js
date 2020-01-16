import React, {Component} from 'react'
import axios from 'Axios'
import { Redirect } from 'react-router-dom'

class RuleDone extends Component{
    state={
        redirect: false,
    }

    confirmRule(){
        var input_condition = this.props.mother_state.input_condition
        var output_condition = this.props.mother_state.output_condition
        var backend_condition = this.props.mother_state.backend_condition

        var original_phrase = this.props.mother_state.key_phrase
        var all_words = this.props.mother_state.words
        var selected_indexes = this.props.mother_state.selected_indexes
        
        var semantic_rule = []
        for (var i=0; i<selected_indexes.length; i++){
            var snapshot = this.props.mother_state.semantic_snapshots[i]
            if(backend_condition=='wordnet'){
                var cur_chosen_examples
                if(snapshot['cur_words']==undefined){
                    cur_chosen_examples = snapshot['user_added_examples']
                }else{
                    cur_chosen_examples = snapshot['chosen_examples']
                    cur_chosen_examples.push(snapshot['cur_words'][0]['name'])
                }
                semantic_rule.push(cur_chosen_examples)
            }else if(backend_condition=='empath'){
                var cur_chosen_examples = snapshot['chosen_examples']
                semantic_rule.push(cur_chosen_examples)
            }
        }


    

        var syntax_rule = this.props.mother_state.syntax_relations

        var rule ={
            original_phrase:original_phrase,
            all_words:all_words,
            selected_word_indexes: selected_indexes,
            semantic_rule: semantic_rule,
            syntax_rule: syntax_rule,
        }
        axios.post('/query_rule_storage', {input_condition: input_condition, output_condition: output_condition, backend_condition: backend_condition, rule: rule, user_id: this.props.mother_this.props.match.params.user_id, keyphrase_id: this.props.mother_this.props.match.params.keyphrase_id})
        .then(res=>{
            this.setState({redirect:true})
        })
    }

    redirectFunction(){
        if(this.state.redirect){
            return (<Redirect to='/done'></Redirect>)
        }
    }

    prev(){
        if(this.props.mother_state.syntax_relations.length>0){
            var input_dict = this.props.mother_state.syntax_relations[this.props.mother_state.syntax_relations.length-1]
            var inferred_dict = this.props.mother_state.syntax_candidates[this.props.mother_state.syntax_relations.length-1]
            var syntax_relations = this.props.mother_state.syntax_relations
            syntax_relations.pop()
            if(input_dict['head']==inferred_dict['head'] && input_dict['word']==inferred_dict['word'] && input_dict['dependency']==inferred_dict['dependency']){
                this.props.mother_this.setState({
                    progress:'syntax',
                    syntax_subprogress: 'verify',
                    // syntax_relations: syntax_relations,
                    // progress_syntax: this.props.mother_state.progress_syntax-1,
                })
            }else{
                var head_switch=false;
                if(input_dict['head']==inferred_dict['word']){
                    head_switch=true;
                }
                this.props.mother_this.setState({
                    progress:'syntax',
                    syntax_subprogress: 'exploration',
                    cur_selected_dep: input_dict['dependency'],
                    dependency_head_switch: head_switch,
                    syntax_relations: syntax_relations,
                    // progress_syntax: this.props.mother_state.progress_syntax-1,
                })
            }
        }else{
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
        }
    }





    render(){
       return (<div>
           <p style={{textAlign:'center'}}>You are done with generating the rule. If you store the rule, please click Confirm.</p>
           <div style={{margin:'auto', width:'fit-content'}}>
               <span className='btn' onClick={this.confirmRule.bind(this)}>Confirm</span>
               <span className='btn red darken-1' onClick={this.prev.bind(this)}>Prev</span>
               {this.redirectFunction()}
           </div>
       </div>) 
    }
}

export default RuleDone;