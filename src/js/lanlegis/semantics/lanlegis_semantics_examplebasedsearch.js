import React, {Component} from 'react'
import axios from 'axios'

class Semantics_ExampleBasedSearch extends Component{

    AddExample(){
        var example_str = this.refs.example_input.value
        var example_list = example_str.split(',')
        var cur_user_added_examples = this.props.mother_state.user_added_examples
        for(var i in example_list){
            var only_space =true
            for(var j in example_list[i]){
                if(example_list[i][j]!=' '){
                    only_space=false
                }
            }
            if(cur_user_added_examples.indexOf(example_list[i].trim())==-1 && example_list[i]!='' && !only_space){  
                cur_user_added_examples.push(example_list[i].trim())
            }
        }

        //query for new example list, update cur_words, init_query_result, word_trajectory
        var query_result_list = this.props.mother_state.query_result_list.slice(0)
        if(this.props.mother_state.backend_condition=='wordnet'){
            axios.post(`/query_wordnet_resorted_examples`, {list:query_result_list, origin_word:this.props.mother_state.cur_origin_word, example_words:this.props.mother_state.user_added_examples})
            .then(res => {
                var new_query_result_list =  res.data['resorted_list']
                var word_trajectory = this.props.mother_state.word_trajectory.slice(0)
                for(var i in word_trajectory){
                    for(var j in new_query_result_list[i]){
                        if(new_query_result_list[i][j]['name']==word_trajectory[i]['name']){
                            word_trajectory[i]['examples'] = new_query_result_list[i][j]['examples']
                        }
                    }
                }
                this.props.mother_this.setState({user_added_examples:cur_user_added_examples, query_result_list:new_query_result_list, word_trajectory:word_trajectory})
                var words_to_pass = cur_user_added_examples.slice(0)
                words_to_pass.push(this.props.mother_state.cur_origin_word)
                axios.post('/query_wordnet_common_hypernym', {words: words_to_pass})
                .then(res=>{
                    var return_list = res.data['query_result']
                    this.props.mother_this.setState({candidates_from_examples:return_list})
                })
                
            })
        }else{
            var words_to_pass = cur_user_added_examples.slice(0)
            words_to_pass.push(this.props.mother_state.cur_origin_word)
            axios.post('/query_empath_examples', {words: words_to_pass, pos: this.props.mother_state.pos})
            .then(res =>{
                var return_list = res.data['query_result']
                var return_list_chosen = res.data['query_result'].slice(0)
                console.log(return_list)
                var cur_empath_examples = this.props.mother_state.empath_examples
                var cur_chosen_examples = this.props.mother_state.chosen_examples
                for(var i in cur_empath_examples){
                    if(cur_chosen_examples.indexOf(cur_empath_examples[i])==-1){
                        if(return_list_chosen.indexOf(cur_empath_examples[i])!=-1){
                            return_list_chosen.splice(return_list_chosen.indexOf(cur_empath_examples[i]), 1)
                        }
                    }
                }
                console.log(return_list, return_list_chosen)
                this.props.mother_this.setState({empath_examples: return_list, chosen_examples: return_list_chosen})
            })
        }
        

        
        


        // this.props.mother_this.setState({user_added_examples:cur_user_added_examples, query_result_list:query_result_list})
    }

    renderInstruction(){
        if(this.props.mother_state.init_query_result==undefined && this.props.mother_state.input_condition!='example'){
            return (<div>
                <h6>You can manually add examples.</h6>
            </div>)
        }else{
            return (<div>
                <h6>By giving out examples that can replace the red word, you can search for high level concepts or more similar examples.</h6>
                <p style={{marginTop:'0px'}}>Also, added example will be used as keywords to detect similar language patterns.</p>
            </div>)
        }
    }


    render(){
        return (<div>
            {this.renderInstruction()}
            
            <div className='row'>
                <div className="col s10">
                    <input placeholder="Separate different words with comma (,)." id="first_name" type="text" class="validate" ref='example_input' style={{fontSize:'10pt'}}/>
                </div>
                <div className="col s2 btn" style={{padding:'0'}} onClick={this.AddExample.bind(this)}>
                    Add
                </div>
            </div>
            
        </div>)
    }
}

export default Semantics_ExampleBasedSearch;