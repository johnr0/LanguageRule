import React, {Component} from 'react';
import KeyPhrase from './lanlegis_keyphrase'
import HeadInstruction from './lanlegis_headinstruction'
import KeywordChoosing from './lanlegis_keywordchoosing'
import Semantics from './semantics/lenlegis_semantics_wrapper'
import axios from 'axios'
import SyntaxWrapper from './syntax/lanlegis_syntax_wrapper';

// this is the mother component for generating the rule
class LanLegis extends Component{
    
    state={
        // below used for loading stuff
        loading: false,


        // indicate in which stage the interface is in
        // keyword_choosing --> semantics --> syntax
        progress: 'keyword_choosing',
        // below variables indicate in which word the user is working on the specifying the rule
        progress_semantics: 0,
        progress_syntax: 0,

        //conditions regarding whether to use direct/example/both
        input_condition: '',
        output_condition: '',

        //backend condition
        // wordnet or empath
        backend_condition: '',

        // key phrase from the backend, where the toxic pattern exists. 
        key_phrase: "Clean my act!? First, you clean mouth of yours.",//'I feel pity that it is the only way to prove your existence',
        words: [],
        stop_words: [],

        // below is the list of indexes of the selected words
        selected_indexes: [],

        // below is variables related to the word search using wordnet
        // subprogress is composed of pos and word_exploration
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

        empath_examples: [],


        // below used for example based search. 
        // when below are not initialized use example based search.
        example_search_list: [],
        example_search_dict: {},
        example_choosen_word: '',

        //below will be used for example-based search
        candidates_from_examples: [],

        // for the saving purpose... save the current state of semantic snapshot if we are moving to the next word
        semantic_snapshots: [],
            // below is variables that are related to selecting the initial definition

            // below is variables that are related to selecting the pos of the word
        pos: undefined,
        pos_list: [],




        // below is related to syntax
        // syntax subprogress is composed of verify, and exploration
        syntax_subprogress: '',
        // syntax_relations stored user selected / generated syntaxes
        syntax_relations: [], 
        // syntax candidates shows syntax relations from server
        syntax_candidates: [],
        cur_selected_dep: '',

        
    };




    // turn the key_phrase from backend to words that can be dealt by the front-end
    PhraseToWord(){
        this.setState({words: this.state.key_phrase.split(/[.\*+-/_?! ]/)},
        function(){
            var words=[]
            for (var i =0; i< this.state.words.length; i++){
                if (this.state.words[i]!=''){
                    words.push(this.state.words[i])

                }
            }
            // console.log(words)

            var stop_words=[]
            var cur_left_overs = this.state.key_phrase
            for (var i=0; i< this.state.words.length; i++){
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
            this.setState({words:words, stop_words:stop_words})

            
        })
    }

    componentWillMount(){
        var input_condition = this.props.match.params.input
        var output_condition = this.props.match.params.output
        var backend_condition = this.props.match.params.backend

        this.setState({input_condition:input_condition, output_condition:output_condition, backend_condition:backend_condition})
    }

    componentDidMount(){
        this.PhraseToWord()
    }

    initializeSemanticSearch(word){
        this.setState({cur_origin_word:undefined, word_trajectory: []})
        if(this.state.backend_condition=='wordnet'){
            
            axios.post(`/query_wordnet_word`, {word:word})
            .then(res => {
                var query_result = res.data['query_result']
                var pos_list = []
                for(var i in query_result){
                    var l = query_result[i]['name'].split('.')
                    var pos =l[l.length-2]
                    if (pos=='s'){
                        pos = 'a'
                    }
                    if (pos_list.indexOf(pos)==-1){
                        pos_list.push(pos)
                    }
                }
                console.log(pos_list)

                var query_result_list = this.state.query_result_list
                query_result_list.push(query_result)
                console.log(pos_list, query_result_list)
                if(this.state.input_condition!='example'){
                    // if there is only one pos
                    if (pos_list.length==0){
                        this.setState({semantics_subprogress:'word_exploration', query_result_list:query_result_list, cur_origin_word:word})
                    }
                    else if (pos_list.length==1){
                        this.setState({pos:pos_list[0], pos_list:pos_list, semantics_subprogress:'word_exploration', init_query_result:query_result, query_result_list:query_result_list, cur_origin_word:word, hypernyms: query_result})
                    }
                    // if there are multiple pos
                    else{
                        this.setState({semantics_subprogress:'pos', init_query_result:query_result, pos_list: pos_list, cur_origin_word:word})
                    }
                }else{
                    if(pos_list.length==0){
                        this.setState({semantics_subprogress:'word_exploration', query_result_list:query_result_list, cur_origin_word:word})
                    }else{
                        this.setState({semantics_subprogress:'word_exploration', query_result_list:query_result_list, cur_origin_word:word, init_query_result: query_result})
                    }
                    
                }
            })
        }else{
            // for empath
            
            // get all possible pos from the server
            axios.post('query_pos', {word:word})
            .then(res => {
                var pos_list = res.data['query_result']
                if (pos_list.length==0){
                    var query_result_list = this.state.query_result_list
                    query_result_list.push([])
                    this.setState({pos: 'X', semantics_subprogress:'word_exploration', init_query_result: [], pos_list:pos_list, cur_origin_word:word, query_result_list: query_result_list})
                }else if(pos_list.length==1){
                    var query_result_list = this.state.query_result_list
                    query_result_list.push([])
                    this.setState({pos: pos_list[0], semantics_subprogress:'word_exploration', init_query_result: [], pos_list:pos_list, cur_origin_word:word, query_result_list: query_result_list})
                }else{
                    this.setState({semantics_subprogress:'pos', init_query_result: [], pos_list:pos_list, cur_origin_word:word})
                }
            })

        }
    }

    SelectPOS(pos){
        var init_query_result = this.state.init_query_result
        var new_query_result = []

        for (var i in init_query_result){
            var cur_result = init_query_result[i]
            var l = cur_result['name'].split('.')
            var cur_pos = l[l.length-2]
            if(pos==cur_pos){
                new_query_result.push(cur_result)
            }
        }
        console.log(new_query_result)

        this.setState({pos:pos, semantics_subprogress: 'word_exploration', query_result_list:[new_query_result], hypernyms: new_query_result})
    }

    originalTextSyntaxCall(){
        var original_text = this.state.key_phrase
        var words = this.state.words
        var selected_indexes = this.state.selected_indexes
        axios.post(`/query_dependency_original_text`, {words:words, original_text: original_text, selected_indexes:selected_indexes})
        .then(res => {
            var dependencies = res.data['dependencies']
            if(dependencies.length!=0){
                this.setState({syntax_candidates:dependencies})
            }else{
                this.setState({progress:'done'})
            }
            
        })
    }

    checkstate(){
        console.log(this.state)
    }

    renderLoading(){
        if(this.state.loading){
            return(<div className='LoadingScreen'>
                        <div class="LoadingCircle preloader-wrapper big active">
                            <div class="spinner-layer spinner-blue">
                                <div class="circle-clipper left">
                                <div class="circle"></div>
                                </div><div class="gap-patch">
                                <div class="circle"></div>
                                </div><div class="circle-clipper right">
                                <div class="circle"></div>
                                </div>
                            </div>

                            <div class="spinner-layer spinner-red">
                                <div class="circle-clipper left">
                                <div class="circle"></div>
                                </div><div class="gap-patch">
                                <div class="circle"></div>
                                </div><div class="circle-clipper right">
                                <div class="circle"></div>
                                </div>
                            </div>

                            <div class="spinner-layer spinner-yellow">
                                <div class="circle-clipper left">
                                <div class="circle"></div>
                                </div><div class="gap-patch">
                                <div class="circle"></div>
                                </div><div class="circle-clipper right">
                                <div class="circle"></div>
                                </div>
                            </div>

                            <div class="spinner-layer spinner-green">
                                <div class="circle-clipper left">
                                <div class="circle"></div>
                                </div><div class="gap-patch">
                                <div class="circle"></div>
                                </div><div class="circle-clipper right">
                                <div class="circle"></div>
                                </div>
                            </div>
                        </div>
                        <div style={{marginTop:'210px'}}>
                            <h5 style={{textAlign:'center'}}>Waiting for server response...</h5>
                        </div>
            </div>)
        }
    }

    renderRuleGenerator(){
        if(this.state.progress=='semantics'){
            return (<Semantics mother_state={this.state} mother_this={this}></Semantics>)
        }else if(this.state.progress=='syntax'){
            return (<SyntaxWrapper mother_state={this.state} mother_this={this}></SyntaxWrapper>)
        }else{
            return (<Semantics mother_state={this.state} mother_this={this}></Semantics>)
        }
    }


    render(){
        if ((this.state.input_condition!='example' || this.state.output_condition!='example') && this.state.backend_condition!='wordnet'){
            return (<div>
                Condition is not met.
            </div>);
        }else{
            return (<div className='WholeWrapper'>
                <HeadInstruction mother_state={this.state}></HeadInstruction>
                <KeyPhrase mother_state={this.state} mother_this={this}></KeyPhrase>
                <KeywordChoosing mother_state={this.state} mother_this={this}></KeywordChoosing>
                {/* <Semantics mother_state={this.state} mother_this={this}></Semantics>
                <SyntaxWrapper mother_state={this.state} mother_this={this}></SyntaxWrapper> */}
                {this.renderRuleGenerator()}
                {this.renderLoading()}
                {/* <div className='stretchheight'></div> */}
                <span onClick={this.checkstate.bind(this)}>check state</span>
            </div>);
        }
        

    }
}

export default LanLegis;