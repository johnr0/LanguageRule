import React, {Component} from 'react';
import axios from 'axios'

class Semantics_WordExploration extends Component{

    renderLowerConceptSet(){


        var cur_idx = this.props.mother_state.cur_idx
        var previous_word_idx = this.props.mother_state.query_result_list.length-1
        var origin_word = this.props.mother_state.words[this.props.mother_state.selected_indexes[this.props.mother_state.progress_semantics]]
        console.log('previous word idx', previous_word_idx)
        console.log('cur word', cur_word)
        if(previous_word_idx >0){
            var cur_word = this.props.mother_state.word_trajectory[previous_word_idx-1]
            var child_word_class = ''
            if(cur_idx!=previous_word_idx){
                child_word_class=' ChildWordSelected'
            }
            if(previous_word_idx==1){
                return (<div>
                    {/* <h5 style={{textAlign:'center'}}>Selected Concept: <span className={'ChildWord'+child_word_class} onClick={this.selectConceptRevert.bind(this, cur_word)}>{cur_word['name']}</span></h5> */}
                    <h6 style={{textAlign:'center'}}>origin word: {origin_word}</h6>
                </div>)
            }else{
                return (<div>
                    {/* <h5 style={{textAlign:'center'}}>Selected Concept: <span className={'ChildWord'+child_word_class} onClick={this.selectConceptRevert.bind(this, cur_word)}>{cur_word['name']}</span></h5> */}
                    <p style={{marginTop:'0px', marginBottom: '0px'}}><b>Lower Concepts:</b></p>
                    <div className="HigherConcepts_Container">{this.renderLowerConcepts()}</div>
                    <h6 style={{textAlign:'center'}}>origin word: {origin_word}</h6>
                </div>)
            }
            
        }else if(this.props.mother_state.example_choosen_word!=''){
            return (<div>
                {/* <h5 style={{textAlign:'center'}}>Selected Concept: <span className={'ChildWord'+child_word_class} onClick={this.selectConceptRevert.bind(this, cur_word)}>{cur_word['name']}</span></h5> */}
                <p style={{marginTop:'0px', marginBottom: '0px'}}><b>Lower Concepts:</b></p>
                <div className="HigherConcepts_Container">{this.renderLowerConcepts()}</div>
                <h6 style={{textAlign:'center'}}>origin word: {origin_word}</h6>
            </div>)
        }else{
            return (<h5 style={{textAlign:'center'}}>origin word: {origin_word}</h5>)
        }
    }

    renderLowerConcepts(){
        var cur_concepts
        if(this.props.mother_state.word_trajectory.length>1){
            // when input is made from bottom to top
            cur_concepts = [this.props.mother_state.word_trajectory[this.props.mother_state.word_trajectory.length-2]]
        }else if(this.props.mother_state.example_choosen_word!=''){
            // when input is made from top to bottom (example-based)
            //cur_concepts = this.props.mother_state.query_result_list[this.props.mother_state.query_result_list.length-3]
            cur_concepts = []//[this.props.mother_state.example_search_dict[this.props.mother_state.example_choosen_word]]
            var example_search_list = this.props.mother_state.example_search_list
            for(var i=0; i<example_search_list.length; i++){
                var cur_list = example_search_list[i]
                var idx = cur_list.indexOf(this.props.mother_state.example_choosen_word)
                if(idx>0){
                    console.log(idx, this.props.mother_state.example_search_list)
                    cur_concepts.push(this.props.mother_state.example_search_dict[cur_list[idx-1]])
                }
            }
            
        }
        
        
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
            
            return (<div key={concept['name']} className={"HigherConcept "+((selected)?'HigherConceptSelected':'')} onClick={this.selectLowerConcept.bind(this, concept)}>{concept['name']}</div>)
        })
    }

    renderGoToLower(){
        var previous_word_idx = this.props.mother_state.query_result_list.length-1
        if(previous_word_idx>this.props.mother_state.cur_idx && this.props.mother_state.cur_idx>-1){
            return (<span className='btn' onClick={this.GoToLower.bind(this)}>Search lower concepts</span>)
        }

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

    selectHigherConcept(concept){
        if(this.props.mother_state.example_choosen_word==''){
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
                this.GoToHigher();
            })
        }else{
            var cur_example_choosen_word = this.props.mother_state.example_choosen_word

            axios.post(`/query_wordnet_hypernym`, {word:concept['name'], origin_word:this.props.mother_state.cur_origin_word, example_words:this.props.mother_state.user_added_examples})
            .then(res => {
                var hypernyms = res.data['query_result']

                this.props.mother_this.setState({example_choosen_word: concept['name'], hypernyms: hypernyms, chosen_examples: concept['examples'],})
                // this.GoToLower()
            })
        }
        
        
    } 
    
    selectLowerConcept(concept){
        if(this.props.mother_state.example_choosen_word==''){
            console.log('concept name ', concept['name'])
            var cur_idx = this.props.mother_state.cur_idx
            var query_result_list = this.props.mother_state.query_result_list
            var word_trajectory = this.props.mother_state.word_trajectory.slice(0)

            cur_idx = cur_idx-1
            word_trajectory.pop()
            word_trajectory.pop()
            word_trajectory.push(concept)
            this.props.mother_this.setState({loading:true})
            
            axios.post(`/query_wordnet_hypernym`, {word:concept['name'], origin_word:this.props.mother_state.cur_origin_word, example_words:this.props.mother_state.user_added_examples})
            .then(res => {
                var hypernyms = res.data['query_result']
                console.log('cur_idx', cur_idx, 'word_tra', word_trajectory)
                var query_result_list = this.props.mother_state.query_result_list
                // console.log(query_result_list)
                query_result_list.pop()
                query_result_list.pop()
                query_result_list.push(hypernyms)
                this.props.mother_this.setState({query_result_list: query_result_list, loading:false, cur_idx:cur_idx, cur_words: [concept], chosen_examples: concept['examples'], hypernyms: hypernyms, word_trajectory:word_trajectory})
                // this.GoToLower()
            })
        }else{
            var selected_base = false
            for(var i=0; i<this.props.mother_state.example_search_list.length; i++){
                var cur_list = this.props.mother_state.example_search_list[i]
                if(cur_list.indexOf(concept['name'])==0){
                    selected_base = true
                }
            }
            if(selected_base){
                word_trajectory = [concept]
                cur_idx = 0
                axios.post(`/query_wordnet_hypernym`, {word:concept['name'], origin_word:this.props.mother_state.cur_origin_word, example_words:this.props.mother_state.user_added_examples})
                .then(res => {
                    var hypernyms = res.data['query_result']
                    var query_result_list = this.props.mother_state.query_result_list
                    query_result_list.push(hypernyms)
                    this.props.mother_this.setState({example_choosen_word:'', example_search_dict:{}, example_search_list:[],
                    query_result_list: query_result_list, loading:false, cur_idx:cur_idx, cur_words: [concept], chosen_examples: concept['examples'], hypernyms: hypernyms, word_trajectory:word_trajectory})
                    // this.GoToLower()
                })
                
            }else{
                var hypernyms = []
                for(var i=0; i<this.props.mother_state.example_search_list.length; i++){
                    var cur_list = this.props.mother_state.example_search_list[i]
                    var idx = cur_list.indexOf(concept['name'])
                    if(idx!=-1){
                        if(idx<cur_list.length-1){
                            hypernyms.push(this.props.mother_state.example_search_dict[cur_list[idx+1]])
                        }
                    }
                }
                this.props.mother_this.setState({example_choosen_word: concept['name'], hypernyms: hypernyms, chosen_examples: concept['examples'],})
                // axios.post(`/query_wordnet_hypernym`, {word:concept['name'], origin_word:this.props.mother_state.cur_origin_word, example_words:this.props.mother_state.user_added_examples})
                // .then(res => {
                //     var hypernyms = res.data['query_result']

                //     this.props.mother_this.setState({example_choosen_word: concept['name'], hypernyms: hypernyms,})
                //     // this.GoToLower()
                // })
            }
            
        }
        
        
    } 

    renderHigherConceptSet(){
        if(true){//this.props.mother_state.example_search_list.length==0){
            return (<div className="HigherConcepts_Container">{this.renderHigherConcepts()}</div>)
        }else{

        }

    }

    renderHigherConcepts(){
        console.log(this.props.mother_state)
        var cur_concepts = this.props.mother_state.hypernyms

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
            
            return (<div key={concept['name']} className={"HigherConcept "+((selected)?'HigherConceptSelected':'')} onClick={this.selectHigherConcept.bind(this, concept)}>{concept['name']}</div>)
        })
    }

    selectCurrentConcept(concept){
        if(this.props.mother_state.example_choosen_word==''){
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
        
        
    } 

    renderCurrentConceptSet(){
        if (this.props.mother_state.query_result_list.length>1 || this.props.mother_state.example_choosen_word!=''){
            return (<div><p style={{marginTop:'0px', marginBottom: '0px'}}><b>Current Concepts:</b></p>
            <div className="HigherConcepts_Container">{this.renderCurrentConcepts()}</div>
        </div>)
        }
        
    }

    renderCurrentConcepts(){
        // console.log(this.props.mother_state)
        var cur_concepts
        if(this.props.mother_state.query_result_list.length>=2){
            cur_concepts = this.props.mother_state.query_result_list[this.props.mother_state.query_result_list.length-2]
        }else if(this.props.mother_state.example_choosen_word!=''){
            cur_concepts = [this.props.mother_state.example_search_dict[this.props.mother_state.example_choosen_word]]
        }
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
            
            return (<div key={concept['name']} className={"HigherConcept "+((selected)?'HigherConceptSelected':'')} onClick={this.selectCurrentConcept.bind(this, concept)}>{concept['name']}</div>)
        }) 
        
        
    }


    render(){
        return (<div style={{border: 'solid 1px black', borderRadius: '5px', padding: '5px', marginTop: '5px'}}>
            <h6 style={{marginBottom:'0px'}}>Select the best high level concept.</h6>
            <p style={{marginTop:'0px'}}>You can see the definition by clicking the concept.</p>
            <p style={{marginTop:'0px', marginBottom: '0px'}}><b>Higher Concepts:</b></p>
            {this.renderHigherConceptSet()}
            
            {this.renderCurrentConceptSet()}
            {/* <div>
                {this.renderGoToLower()}
                {this.renderGoToHigher()}
            </div> */}
            {this.renderLowerConceptSet()}
        </div>)
    }
}

export default Semantics_WordExploration;