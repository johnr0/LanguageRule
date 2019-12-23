import React, {Component} from 'react';
import axios from 'axios'

class Semantics_WordExploration extends Component{

    renderLowerWords(){
        var cur_idx = this.props.mother_state.cur_idx
        var previous_word_idx = this.props.mother_state.query_result_list.length-1
        var origin_word = this.props.mother_state.words[this.props.mother_state.selected_indexes[this.props.mother_state.progress_semantics]]
        console.log(previous_word_idx)
        if(previous_word_idx >0){
            var cur_word = this.props.mother_state.word_trajectory[previous_word_idx-1]
            var child_word_class = ''
            if(cur_idx!=previous_word_idx){
                child_word_class=' ChildWordSelected'
            }
            return (<div>
                <h5 style={{textAlign:'center'}}>child word: <span className={'ChildWord'+child_word_class} onClick={this.selectConceptRevert.bind(this, cur_word)}>{cur_word['name']}</span></h5>
                <h6 style={{textAlign:'center'}}>origin word: {origin_word}</h6>
            </div>)
        }else{
            return (<h5 style={{textAlign:'center'}}>origin word: {origin_word}</h5>)
        }
    }

    renderGoToLower(){
        var previous_word_idx = this.props.mother_state.query_result_list.length-1
        if(previous_word_idx>this.props.mother_state.cur_idx && this.props.mother_state.cur_idx>-1){
            return (<span className='btn' onClick={this.GoToLower.bind(this)}>Search lower concepts</span>)
        }

    }

    GoToLower(){
        var query_result_list = this.props.mother_state.query_result_list
        var hypernyms = query_result_list.pop()
        this.props.mother_this.setState({query_result_list:query_result_list, hypernyms: hypernyms})
    }

    renderGoToHigher(){
        var previous_word_idx = this.props.mother_state.query_result_list.length-1
        if(this.props.mother_state.hypernyms.length>0 && this.props.mother_state.cur_idx==previous_word_idx){
            return (<span className='btn' onClick={this.GoToHigher.bind(this)}>Search higher concept</span>)
        }
    }

    GoToHigher(){
        var hypernyms = this.props.mother_state.hypernyms
        var query_result_list = this.props.mother_state.query_result_list
        query_result_list.push(hypernyms)
        this.props.mother_this.setState({query_result_list:query_result_list})
    }


    selectConceptRevert(concept){
        var cur_idx = this.props.mother_state.cur_idx
        var query_result_list = this.props.mother_state.query_result_list
        var word_trajectory = this.props.mother_state.word_trajectory
        if(query_result_list.length <= word_trajectory.length){

            // pop one, add
            cur_idx = cur_idx-1
            word_trajectory.pop()
        }
        this.props.mother_this.setState({loading:true})
        axios.post(`/query_wordnet_hypernym`, {word:concept['name'], origin_word:this.props.mother_state.cur_origin_word, example_words:this.props.mother_state.user_added_examples})
        .then(res => {
            var hypernyms = res.data['query_result']
            this.props.mother_this.setState({loading:false, cur_idx:cur_idx, cur_words: [concept], chosen_examples: concept['examples'], hypernyms: hypernyms, word_trajectory:word_trajectory})
        })
        
    }  

    selectConcept(concept){
        var cur_idx = this.props.mother_state.cur_idx
        var query_result_list = this.props.mother_state.query_result_list
        var word_trajectory = this.props.mother_state.word_trajectory
        if(query_result_list.length > word_trajectory.length){
            // just add
            cur_idx = cur_idx+1
            word_trajectory.push(concept)
        }else{
            // pop one, add
            word_trajectory.pop()
            word_trajectory.push(concept)
        }
        this.props.mother_this.setState({loading:true})
        axios.post(`/query_wordnet_hypernym`, {word:concept['name'], origin_word:this.props.mother_state.cur_origin_word, example_words:this.props.mother_state.user_added_examples})
        .then(res => {
            var hypernyms = res.data['query_result']
            this.props.mother_this.setState({loading:false, cur_idx:cur_idx, cur_words: [concept], chosen_examples: concept['examples'], hypernyms: hypernyms, word_trajectory:word_trajectory})
        })
        
    }    

    renderHigherConcepts(){
        console.log(this.props.mother_state)
        var cur_concepts = this.props.mother_state.query_result_list[this.props.mother_state.query_result_list.length-1]
        
        console.log(cur_concepts)
        return cur_concepts.map((concept, idx)=>{
            var selected
            if(this.props.mother_state.word_trajectory.length<=this.props.mother_state.cur_idx || this.props.mother_state.cur_idx<0){
                selected = false;
            }else{
                // selected = false;
                console.log(this.props.mother_state.word_trajectory)
                selected = (concept['name']==this.props.mother_state.word_trajectory[this.props.mother_state.cur_idx]['name'])
            }
            
            return (<div key={concept['name']} className={"HigherConcept "+((selected)?'HigherConceptSelected':'')} onClick={this.selectConcept.bind(this, concept)}>{concept['name']}</div>)
        })
    }



    render(){
        return (<div style={{backgroundColor:'#eeeeee', padding: '5px', marginTop: '5px'}}>
            <h6 style={{marginBottom:'0px'}}>Select the best high level concept.</h6>
            <p style={{marginTop:'0px'}}>You can see the definition by clicking the concept.</p>
            <div className="HigherConcepts_Container">{this.renderHigherConcepts()}</div>
            <div>
                {this.renderGoToLower()}
                {this.renderGoToHigher()}
            </div>
            <div>
                {this.renderLowerWords()}
            </div>
        </div>)
    }
}

export default Semantics_WordExploration;