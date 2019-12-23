import React, {Component} from 'react'
import axios from 'axios'

class SemanticsOutput extends Component{
    Done(){
        var snapshot = {
            semantics_subprogress: this.props.mother_state.semantics_subprogress,
            cur_words: this.props.mother_state.cur_words.slice(0),
            cur_idx: this.props.mother_state.cur_idx,
            word_trajectory: this.props.mother_state.word_trajectory.slice(0),
            query_result_list: this.props.mother_state.query_result_list.slice(0),
            init_query_result: this.props.mother_state.init_query_result.slice(0),
            hypernyms: this.props.mother_state.hypernyms.slice(0),
            chosen_examples: this.props.mother_state.chosen_examples.slice(0),
        }
        var snapshot_list = this.props.mother_state.semantic_snapshots
        var progress_semantics = this.props.mother_state.progress_semantics+1

        snapshot_list.push(snapshot)

        this.props.mother_this.setState({
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
            semantic_snapshots: snapshot_list,
        })
        this.props.mother_this.initializeSemanticSearch(this.props.mother_state.words[this.props.mother_state.selected_indexes[progress_semantics]])


    }

    renderDoneButton(){
        if(this.props.mother_state.cur_idx>=0){
            return (<div className="SemanticDoneButton btn" onClick={this.Done.bind(this)}>Done with finding the highest level concept
                </div>)
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
            console.log(cur_examples)
            console.log(example, excluded)
            return (<div key={'example_'+example} className={"ConceptExample"+((excluded)?' ConceptExampleExcluded':'')}>{example}
            <div className={(excluded)?"ConceptExample_Add":"ConceptExample_Remove"} onClick={this.toggleExample.bind(this, example)}>{(excluded)?'+':'X'}</div>
            </div>)
        })
    }

    renderExamples(concept){
        if(this.props.mother_state.output_condition!='definition'&&concept['examples'].length!=0){
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

    renderConcepts(){
        var cur_concepts = this.props.mother_state.cur_words
        return cur_concepts.map((concept, idx) => {
            return (<div>
                <h6><b>Currently Selected Concept:</b> {concept['name']}</h6>
                {this.renderDefinition(concept)}
                {this.renderExamples(concept)}
                
                
            </div>)
        })
    }

    renderOutput(){
        if(this.props.mother_state.cur_idx>=0){
            return (<div>{this.renderConcepts()}</div>)
        }else{
            return (<div></div>)
        }
    }

    removeUserExample(example){
        var user_added_examples = this.props.mother_state.user_added_examples.slice(0)
        user_added_examples.splice(user_added_examples.indexOf(example),1)
        var query_result_list = this.props.mother_state.query_result_list.slice(0)
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
            
        })
        

    }

    renderUserExample(){
        return this.props.mother_state.user_added_examples.map((example)=>{
            return (<div key={'example_'+example} className={"ConceptExample"}>{example}
            <div className={"ConceptExample_Remove"} onClick={this.removeUserExample.bind(this, example)}>X</div>
            </div>)
        })
    }

    renderUserExamples(){
        if(this.props.mother_state.semantics_subprogress=='word_exploration'){
            return (<div style={{marginTop:'25px'}}>
                <h6>You added following examples:</h6>
                <div className="UserExamplesBox">
                    {this.renderUserExample()}
                </div>
            </div>)
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
        if(this.props.mother_state.output_condition!='definition'&&concept['examples'].length!=0){
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
        if(this.props.mother_state.semantics_subprogress=='word_exploration' && this.props.mother_state.candidates_from_examples.length>0){
            return (<div>
                <h6>Possible candidates of concepts from examples you provided.</h6>
                <div className="CandidateBox">
                    {this.renderCandidate()}
                </div>
            </div>)
        }
    }

    render(){
        return (<div>
            {this.renderUserExamples()}
            {this.renderOutput()}
            {this.renderDoneButton()}
            {this.renderCandidates()}
        </div>)
    }
}

export default SemanticsOutput