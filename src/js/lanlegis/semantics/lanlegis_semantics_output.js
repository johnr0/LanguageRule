import React, {Component} from 'react'
import axios from 'axios'
import { defaultCipherList } from 'constants'
import SemanticsPrevBtn from './lanlegis_semantics_prev_btn'

class SemanticsOutput extends Component{
    Done(){
        var cur_words = undefined
        var init_query_result = undefined
        if(this.props.mother_state.cur_words!=undefined){
            cur_words = this.props.mother_state.cur_words.slice(0)
            init_query_result = this.props.mother_state.init_query_result.slice(0)
        }
        var snapshot = {
            semantics_subprogress: this.props.mother_state.semantics_subprogress,
            cur_words: cur_words,
            cur_idx: this.props.mother_state.cur_idx,
            word_trajectory: this.props.mother_state.word_trajectory.slice(0),
            query_result_list: this.props.mother_state.query_result_list.slice(0),
            init_query_result: init_query_result,
            hypernyms: this.props.mother_state.hypernyms.slice(0),
            chosen_examples: this.props.mother_state.chosen_examples.slice(0),
            user_added_examples: this.props.mother_state.user_added_examples.slice(0),
            example_search_list: this.props.mother_state.example_search_list.slice(0),
            example_search_dict: JSON.parse(JSON.stringify(this.props.mother_state.example_search_dict)),
            example_choosen_word: this.props.mother_state.example_choosen_word,
            candidates_from_examples: this.props.mother_state.candidates_from_examples,
            empath_examples: this.props.mother_state.empath_examples,
            pos: this.props.mother_state.pos,
            pos_list: this.props.mother_state.pos_list

        }
        var snapshot_list = this.props.mother_state.semantic_snapshots
        var progress_semantics = this.props.mother_state.progress_semantics
        var progress='semantics'
        if(progress_semantics+1>=this.props.mother_state.selected_indexes.length){
            progress = 'syntax'
            this.props.mother_this.originalTextSyntaxCall()
            this.props.mother_this.setState({syntax_subprogress: 'verify'})
        }else{
            progress_semantics = progress_semantics+1
        }
        snapshot_list.push(snapshot)
        

        this.props.mother_this.setState({
            progress: progress,
            progress_semantics: progress_semantics,
            semantics_subprogress: '',
            // this controls "output" pane, and can be the list
            cur_words: undefined,
                // cur_idx is the index of the current keyword in 
                // when cur_idx is positive or 0, output will be visualized
            cur_idx: -1,
            word_trajectory: [],
            query_result_list: [],
            init_query_result: undefined,
                // hypernyms of the currently selected word
            hypernyms: [],
            //list of words that is stored into database later
            chosen_examples: [],
            user_added_examples: [],
            example_search_list: [],
            example_search_dict: {},
            example_choosen_word: '',
            candidates_from_examples: [],
            semantic_snapshots: snapshot_list,
            empath_examples: [],
            pos: undefined,
            pos_list: [],
        })
        if(progress=='semantics'){
            this.props.mother_this.initializeSemanticSearch(this.props.mother_state.words[this.props.mother_state.selected_indexes[progress_semantics]])
        }   


    }

    renderDoneButton(){
        if(this.props.mother_state.init_query_result!=undefined){
            if(this.props.mother_state.cur_idx>=0){
                return (<div className="SemanticDoneButton btn" onClick={this.Done.bind(this)}>Done with finding the highest level concept
                    </div>)
            }else if(this.props.mother_state.user_added_examples.length>0 && this.props.mother_state.input_condition!='example'){
                return (<div className="SemanticDoneButton btn" onClick={this.Done.bind(this)}>Done with finding the highest level concept
                    </div>)
            }
        }
    }

    renderDoneButton2(){
        if(this.props.mother_state.backend_condition=='wordnet'){
            if(this.props.mother_state.init_query_result==undefined){
                if(this.props.mother_state.cur_idx>=0 || this.props.mother_state.user_added_examples.length>0){
                    return (<div className="SemanticDoneButton btn" onClick={this.Done.bind(this)}>Done with adding other examples.
                        </div>)
                }
            }
        }else{
            if(this.props.mother_state.chosen_examples.length>0){
                return (<div style={{marginTop:'10px'}} className="SemanticDoneButton btn" onClick={this.Done.bind(this)}>Done with adding other examples.
                        </div>)
            }
        }
        
    }

    renderDefinition(concept){
        if(this.props.mother_state.output_condition!='example'){
            return (<div><span><b>Def.</b></span> {concept['definition']}</div>)
        }else{
            return
        }
    }

    toggleExample(example){
        var cur_examples = this.props.mother_state.chosen_examples.slice(0)
        if (cur_examples.indexOf(example)!=-1){
            cur_examples.splice(cur_examples.indexOf(example), 1)
        }else{
            cur_examples.push(example)
        }
        this.props.mother_this.setState({chosen_examples:cur_examples})
    }
    
    renderExample(concept){
        return concept['examples'].map((example)=>{
            var cur_examples = this.props.mother_state.chosen_examples
            var excluded = (cur_examples.indexOf(example)==-1)
            // console.log(cur_examples)
            // console.log(example, excluded)
            return (<div key={'example_'+example} className={"ConceptExample"+((excluded)?' ConceptExampleExcluded':'')}>{example}
            <div className={(excluded)?"ConceptExample_Add":"ConceptExample_Remove"} onClick={this.toggleExample.bind(this, example)}>{(excluded)?'+':'X'}</div>
            </div>)
        })
    }

    renderExamples(concept){
        if(this.props.mother_state.output_condition!='direct'&&concept['examples'].length!=0){
            return (<div>
                <div><b>Examples.</b> (Examples that are dissimilar to the red word is shown first.)</div>
                <div className="ConceptExampleBox">
                {this.renderExample(concept)}
                </div>
            </div>)
            
        }else{
            return
        }
    }

    renderConcepts(cur_concepts){
        
        return cur_concepts.map((concept, idx) => {
            return (<div>
                <h6><b>Currently Selected Concept:</b> {concept['name']}</h6>
                {this.renderDefinition(concept)}
                {this.renderExamples(concept)}
                
                
            </div>)
        })
    }

    renderOutput(){
        if(this.props.mother_state.backend_condition=='wordnet'){
            if(this.props.mother_state.cur_idx>=0){
                var cur_concepts = this.props.mother_state.cur_words
                return (<div>{this.renderConcepts(cur_concepts)}</div>)
            }else if(this.props.mother_state.example_choosen_word!=''){
                var cur_concepts = [this.props.mother_state.example_search_dict[this.props.mother_state.example_choosen_word]]
                return (<div>{this.renderConcepts(cur_concepts)}</div>)
            }else{
                return (<div></div>)
            }
        }
        
    }

    selectAllEmpathExamples(){
        this.props.mother_this.setState({chosen_examples: this.props.mother_state.empath_examples})
    }

    unselectAllEmpathExamples(){
        this.props.mother_this.setState({chosen_examples: this.props.mother_state.user_added_examples})
    }

    renderEmpathOutput(){
        if(this.props.mother_state.backend_condition=='empath'){
            if(this.props.mother_state.empath_examples.length>0){
                return (<div>
                    <p>Extracted examples that are similar to the examples you gave:</p>
                    <div className="ConceptExampleBox" style={{maxHeight: '220px'}}>
                        {this.renderEmpathExamples()}

                    </div>
                    <div style={{margin: 'auto', width:'fit-content'}}>
                        <span className='btn' onClick={this.selectAllEmpathExamples.bind(this)}>Select All Examples</span> 
                        <span className='btn red darken-4' onClick={this.unselectAllEmpathExamples.bind(this)}>Unselect All Examples</span>
                    </div>
                </div>)
            }
        }
    }

    renderEmpathExamples(){
        return this.props.mother_state.empath_examples.map((example)=>{
            if(this.props.mother_state.user_added_examples.indexOf(example)==-1){
                var cur_examples = this.props.mother_state.chosen_examples
                var excluded = (cur_examples.indexOf(example)==-1)
                // console.log(cur_examples)
                // console.log(example, excluded)
                return (<div key={'example_'+example} className={"ConceptExample"+((excluded)?' ConceptExampleExcluded':'')}>{example}
                <div className={(excluded)?"ConceptExample_Add":"ConceptExample_Remove"} onClick={this.toggleExample.bind(this, example)}>{(excluded)?'+':'X'}</div>
                </div>)
            }
        })
    }

    removeUserExample(example){
        var user_added_examples = this.props.mother_state.user_added_examples.slice(0)
        user_added_examples.splice(user_added_examples.indexOf(example),1)
        var query_result_list = this.props.mother_state.query_result_list.slice(0)
        if(this.props.mother_state.backend_condition=='wordnet'){
            axios.post(`/query_wordnet_resorted_examples`, {list:query_result_list, origin_word:this.props.mother_state.cur_origin_word, example_words:user_added_examples})
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
                this.props.mother_this.setState({user_added_examples:user_added_examples, query_result_list:new_query_result_list, word_trajectory:word_trajectory})
                var words_to_pass = user_added_examples.slice(0)
                words_to_pass.push(this.props.mother_state.cur_origin_word)
                axios.post('/query_wordnet_common_hypernym', {words: words_to_pass})
                .then(res=>{
                    var return_list = res.data['query_result']
                    this.props.mother_this.setState({candidates_from_examples:return_list})
                })
                
            })
        }else if(this.props.mother_state.backend_condition=='empath'){
            if(user_added_examples.length!=0){
                var word_to_pass = user_added_examples.slice(0)
                word_to_pass.push(this.props.mother_state.cur_origin_word)
                axios.post('/query_empath_examples', {words:word_to_pass, pos: this.props.mother_state.pos})
                .then(res=>{
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
                    this.props.mother_this.setState({empath_examples: return_list, chosen_examples: return_list_chosen, user_added_examples:user_added_examples})
                })
            }else{
                this.props.mother_this.setState({empath_examples: [], chosen_examples: [], user_added_examples:user_added_examples})
            }
            
        }
        
        

    }

    renderUserExample(){
        return this.props.mother_state.user_added_examples.map((example)=>{
            return (<div key={'example_'+example} className={"ConceptExample"}>{example}
            <div className={"ConceptExample_Remove"} onClick={this.removeUserExample.bind(this, example)}>X</div>
            </div>)
        })
    }

    renderUserExamples(){
        var input = this.props.mother_state.input_condition
        var output = this.props.mother_state.output_condition
        if (input!='direct' || this.props.mother_state.init_query_result==undefined){
            if(this.props.mother_state.semantics_subprogress=='word_exploration'){
                return (<div style={{marginTop:'25px'}}>
                    <h6>You added following examples:</h6>
                    <div className="UserExamplesBox">
                        {this.renderUserExample()}
                    </div>
                </div>)
            }
        }
        
        
    }

    renderCandidateExample(concept){
        return concept['examples'].map((example)=>{
            var cur_examples = this.props.mother_state.chosen_examples
            var excluded = (cur_examples.indexOf(example)==-1)
            return (<div key={'example_'+example} className={"ConceptExample"}>{example}
            </div>)
        })
    }

    renderCandidateExamples(concept){
        if(this.props.mother_state.output_condition!='direct'&&concept['examples'].length!=0){
            return (<div>
                <div><b>Examples.</b> (Examples that are dissimilar to the red word is shown first.)</div>
                <div className="ConceptExampleBox">
                {this.renderCandidateExample(concept)}
                </div>
            </div>)
            
        }else{
            return
        }
    }

    CandidateChoose(candidate_name){
        console.log(candidate_name)
        var candidate_is_lowest = false
        var concept;
        for(var i=0; i<this.props.mother_state.init_query_result.length; i++){
            if(candidate_name == this.props.mother_state.init_query_result[i]['name']){
                candidate_is_lowest = true
                concept = this.props.mother_state.init_query_result[i]
            }
        }
        var query_result_list = this.props.mother_state.query_result_list
        while(query_result_list.length>1){
            query_result_list.pop()
        }
        if(candidate_is_lowest){
            var cur_idx = 0
            
            var word_trajectory = [concept]
            this.props.mother_this.setState({loading:true})
            axios.post(`/query_wordnet_hypernym`, {word:concept['name'], origin_word:this.props.mother_state.cur_origin_word, example_words:this.props.mother_state.user_added_examples})
            .then(res => {
                var hypernyms = res.data['query_result']
                query_result_list.push(hypernyms)
                this.props.mother_this.setState({loading:false, cur_idx:cur_idx, cur_words: [concept], chosen_examples: concept['examples'], hypernyms: hypernyms, word_trajectory:word_trajectory, query_result_list:query_result_list, example_search_dict:{}, example_choosen_word:'', example_search_list:[],})
            })
        }else{
            axios.post('/query_wordnet_common_hypernym_path', {init_word: this.props.mother_state.cur_origin_word, examples: this.props.mother_state.user_added_examples, choosen_word:candidate_name})
            .then(res=>{
                console.log(res.data)
                var return_list = res.data['return_result']
                var item_dict = res.data['item_dict']
                axios.post(`/query_wordnet_hypernym`, {word:candidate_name, origin_word:this.props.mother_state.cur_origin_word, example_words:this.props.mother_state.user_added_examples})
                .then(res => {
                    var hypernyms = res.data['query_result']
                    
                    this.props.mother_this.setState({hypernyms: hypernyms,cur_idx: -1, word_trajectory:[], query_result_list:query_result_list, example_search_list:return_list, example_search_dict: item_dict, example_choosen_word:candidate_name, chosen_examples: item_dict[candidate_name]['examples']})
                })

            })
        }
        
    }

    CandidateChooseBtn(candidate){
        return (<span className="btn CandidateChoosebtn" onClick={this.CandidateChoose.bind(this,candidate['name'])}>Choose this</span>)
    }

    renderCandidate(){
        return this.props.mother_state.candidates_from_examples.map((candidate, idx)=>{
            return (<div className="Candidate">
                <h6>{candidate['name']} {this.CandidateChooseBtn(candidate)}</h6> 
                {this.renderDefinition(candidate)}
                {this.renderCandidateExamples(candidate)}
            </div>)
        })
    }

    renderCandidates(){
        var input = this.props.mother_state.input_condition
        var output = this.props.mother_state.output_condition
        if(input!='direct'){
            if(this.props.mother_state.semantics_subprogress=='word_exploration' && this.props.mother_state.candidates_from_examples.length==0 && this.props.mother_state.user_added_examples.length>0 && this.props.mother_state.input_condition=='example' && this.props.mother_state.init_query_result==undefined){
                return (<div>
                    <h6>No common concept is found. You can manually add more examples.</h6>
                </div>)
            }
            if(this.props.mother_state.semantics_subprogress=='word_exploration' && this.props.mother_state.candidates_from_examples.length>0){
                return (<div>
                    <h6>Possible candidates of concepts from examples you provided.</h6>
                    <div className="CandidateBox">
                        {this.renderCandidate()}
                    </div>
                </div>)
            }
        }
        
    }

    render(){
        return (<div>
            {this.renderOutput()}
            {this.renderDoneButton()}
            {this.renderUserExamples()}
            {this.renderEmpathOutput()}
            {this.renderCandidates()}
            {this.renderDoneButton2()}
            <SemanticsPrevBtn mother_state={this.props.mother_state} mother_this={this.props.mother_this}></SemanticsPrevBtn>
        </div>)
    }
}

export default SemanticsOutput