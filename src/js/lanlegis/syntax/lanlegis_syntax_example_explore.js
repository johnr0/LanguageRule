import React, {Component} from 'react'
import axios from 'axios'
import SyntaxExampleRenderer from './lanlegis_syntax_example_renderer'
import SyntaxDefinitionRenderer from './lanlegis_syntax_definition_renderer'

class SyntaxExampleExplore extends Component{

    state={
        examples: [],
        
        cur_sentence: '',
        cur_words: [],
        cur_stop_words: [],
        cur_word_selected: [],
        // write --> select --> verify
        exampleInputStage: 'write',

        inferred_dep: '',
    }

    inputRegister(){
        var temp_words = this.refs.example_input.value.split(/[.\*+-/_?! ]/)

        var words=[]
        for (var i =0; i< temp_words.length; i++){
            if (temp_words[i]!=''){
                words.push(temp_words[i])

            }
        }
            // console.log(words)

        var stop_words=[]
        var cur_left_overs = this.refs.example_input.value
        for (var i=0; i< temp_words.length; i++){
            if(cur_left_overs==undefined){
                continue
            }

            var cur_split = cur_left_overs.split(words[i])
            var cur_stop = cur_split[0]
            var cur_left_overs = cur_split[1]

            // console.log('curstop', cur_stop)
            for (var j=2; j<cur_split.length; j++){
                cur_left_overs = cur_left_overs+words[i]+cur_split[j]
            }
            // console.log(cur_left_overs)
            if(i==0){
                continue
            }
            stop_words.push(cur_stop)
        }
            // console.log(stop_words)
        this.setState({cur_words:words, cur_stop_words:stop_words, cur_sentence:this.refs.example_input.value, exampleInputStage: 'select'})

    }

    wordSelection(idx){
        var cur_word_selection = this.state.cur_word_selected
        if(cur_word_selection.length==2){
            cur_word_selection.splice(0,1)
        }
        cur_word_selection.push(idx)
        this.setState({cur_word_selected: cur_word_selection})
        

    }

    renderWordsForSelection(){
        return this.state.cur_words.map((word, idx)=>{
            var selected=false
            if(this.state.cur_word_selected.indexOf(idx)!=-1){
                selected=true;
            }
            return (<div className='WordInPhrase'>
                <div className={'WordInPhrase_Button_small '+((selected)?' WordInPhrase_Selected':'')} onClick={this.wordSelection.bind(this, idx)}>{word}</div>
                <span>{this.state.cur_stop_words[idx]}</span>
            </div>)
        })
    }

    renderWordsForExample(words, stop_words, selected_indexes){
        return words.map((word, idx)=>{
            var selected=false
            if(selected_indexes.indexOf(idx)!=-1){
                selected=true;
            }
            return (<div className='WordInPhrase'>
                <div className={'WordInPhrase_Button_small2 '+((selected)?' WordInPhrase_Selected':'')}>{word}</div>
                <span>{this.state.cur_stop_words[idx]}</span>
            </div>)
        })
    }

    addExample(){
        var example_dict={
            original_text: this.state.cur_sentence,
            words: this.state.cur_words.slice(0),
            selected_indexes: this.state.cur_word_selected.slice(0),
            stop_words: this.state.cur_stop_words.slice(0),
        }
        var examples = this.state.examples
        examples.push(example_dict)
        this.setState({examples:examples, cur_sentence:'', cur_words: [], cur_word_selected:[], cur_stop_words:[], exampleInputStage:'write'})
    }

    exampleRender(){
        return this.state.examples.map((example, idx)=>{
            var cur_words = example['words']
            var cur_stop_words = example['stop_words']
            var selected_indexes = example['selected_indexes']
            return (<div style={{marginBottom: '5px',}}>
                {this.renderWordsForExample(cur_words, cur_stop_words, selected_indexes)}
            </div>)
        })
    }

    verify(yes){
        if(yes){
            var cur_syntax_dict = JSON.parse(JSON.stringify(this.props.mother_state.syntax_candidates[this.props.mother_state.progress_syntax]))
            cur_syntax_dict['dependency'] = this.state.inferred_dep
            if(this.props.mother_state.dependency_head_switch==true){
                var head = cur_syntax_dict['head']
                cur_syntax_dict['head'] = cur_syntax_dict['word']
                cur_syntax_dict['word'] = head
            }
            var syntax_relations = this.props.mother_state.syntax_relations
            
            syntax_relations.push(cur_syntax_dict)
            if(syntax_relations.length < this.props.mother_state.syntax_candidates.length){
                var new_progress_syntax = this.props.mother_state.progress_syntax+1
                this.props.mother_this.setState({syntax_relations: syntax_relations, progress_syntax: new_progress_syntax, syntax_subprogress:'verify', dependency_head_switch: false, cur_selected_dep:''})
            }else{
                this.props.mother_this.setState({progress:'done', syntax_relations: syntax_relations, syntax_subprogress:'verify', dependency_head_switch: false, cur_selected_dep:''})
            }
            
        }
        this.setState({examples:[], inferred_dep:'', cur_sentence:'', cur_words: [], cur_word_selected:[], cur_stop_words:[], exampleInputStage:'write',})
    }

    SDRenderer(inferred_dep){
        if(this.props.mother_state.output_condition!='example'){
            return (<div>
                {SyntaxDefinitionRenderer(this.state.inferred_dep)}
            </div>)
        }
    }

    SERenderer(inferred_dep){
        if(this.props.mother_state.output_condition!='direct'){
            return (<div>
                {SyntaxExampleRenderer(this.state.inferred_dep)}
            </div>)
        }
    }
    InstructionRenderer(){
        if(this.props.mother_state.output_condition!='example'){
            return (<h6><b>Is the grammatical relationship given in examples defined as below?</b></h6>)
        }else{
            return (<h6><b>Is the grammatical relationship given in examples similar as below examples?</b></h6>)
        }
    }

    inputRender(){
        if(this.state.exampleInputStage=='write'){
            return (<div className='row'>
                <p style={{marginBottom: '0px', marginTop: '0px'}}>Add an example sentence.</p>
                <div className="col s10">
                    <input placeholder="Type in the example in full sentence with correct grammar." id="first_name" type="text" ref='example_input' style={{fontSize:'10pt'}}/>
                </div>
                <div className="col s2 btn" style={{padding:'0'}} onClick={this.inputRegister.bind(this)}>
                    Next
                </div>
            </div>)
        }else if(this.state.exampleInputStage=='select'){
            var tonext = false
            if(this.state.cur_word_selected.length==2){
                tonext = true
            }
            return (<div>
                <p style={{marginBottom: '0px', marginTop: '0px'}}>Select two words in the relationship (don't consider the order of selection) <span className={'btn'+((tonext)?'':' hidden')} onClick={this.addExample.bind(this)}>Next</span></p>
                {this.renderWordsForSelection()}
                
            </div>)

        }else if(this.state.exampleInputStage=='verify'){
            return (<div>
                {this.InstructionRenderer()}
                {this.SDRenderer(this.state.inferred_dep)}
                {this.SERenderer(this.state.inferred_dep)}
                <div style={{margin:'auto'}}>
                    <div className='btn' onClick={this.verify.bind(this, true)}>Yes</div>
                    <div className='btn red darken-1' onClick={this.verify.bind(this, false)}>No</div>
                </div>
            </div>)
        }

    }

    queryDependency(){
        axios.post(`/query_dependencies_from_examples`, {examples: this.state.examples})
        .then(res => {
            var dep = res.data['dependency']
            console.log(dep)
            this.setState({inferred_dep:dep, cur_sentence:'', cur_words: [], cur_word_selected:[], cur_stop_words:[], exampleInputStage:'verify' })
        })
    }

    QueryButtonRender(){
        if(this.state.examples.length>=2 && this.state.exampleInputStage!='verify'){
            return (<div className='btn' onClick={this.queryDependency.bind(this)}>Find the relationship from given examples.</div>)
        }
    }

    render(){
        return (<div className='textCentered'>
            <h6>To find definition of the relationship between <span style={{color:'#0000d1'}}>blue</span> and <span style={{color:'#d10000'}}>red</span> words, please give a couple examples which shows the same relationship.</h6>
            {this.exampleRender()}
            {this.inputRender()}
            {this.QueryButtonRender()}
        </div>)
    }
}

export default SyntaxExampleExplore;