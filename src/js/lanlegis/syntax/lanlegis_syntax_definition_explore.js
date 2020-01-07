import React, {Component} from 'react'
import SyntaxDefinitionRenderer from './lanlegis_syntax_definition_renderer'
import SyntaxExampleRenderer from './lanlegis_syntax_example_renderer'

class SyntaxDefinitionExplore extends Component{
    state={
        modal: ''
    }


    SDRenderer(modal){
        if(this.props.mother_state.output_condition!='example'){
            return (<div>
                {SyntaxDefinitionRenderer(this.state.modal)}
            </div>)
        }
    }

    SERenderer(modal){
        if(this.props.mother_state.output_condition!='direct'){
            return (<div>
                <p>Examples:</p>
                {SyntaxExampleRenderer(this.state.modal)}
            </div>)
        }
    }

    renderInfoModal(){
        if(this.state.modal!=''){
            return (<div className='DependencyModal' style={{left: '10px', top: this.state.y+10}}>
                {this.SDRenderer(this.state.modal)}
                {this.SERenderer(this.state.modal)}
            </div>)
        }
    }



    setModal(dep, e){
        this.setState({modal:dep, x:e.pageX, y:e.pageY})
        console.log(e.pageX, e.pageY)

    }

    resetModal(dep, e){
        this.setState({modal:'',})
    }

    selectDependency(dep){
        this.props.mother_this.setState({cur_selected_dep: dep})
    }

    renderButton(dep){
        var selected = (this.props.mother_state.cur_selected_dep==dep)
        console.log(this.props.mother_state,this.props.mother_state.cur_selected_dep, dep)
        return (<div className={'SyntaxButton '+((selected)?' SyntaxButtonSelected':'')} onMouseOver={this.setModal.bind(this, dep)} onMouseOut={this.resetModal.bind(this, dep)}
        onClick={this.selectDependency.bind(this, dep)}>{dep}</div>)
    }

    render(){
        return (<div>
            <h6>Please find and select the right relationship between two words.</h6>
            <div className='SyntaxDefinitionContainer col s12'>
                <div className='col s4'>
                    <div className='row'>
                        <div><b>Core dependents of clausal predicates</b></div>
                        <div className='col s4'>
                            <span>Nominal dep</span>
                            {this.renderButton('nsubj')}
                            {this.renderButton('nsubjpass')}
                            {this.renderButton('obj')}
                            {this.renderButton('iobj')}
                        </div>
                        <div className='col s4'>
                            <span>Predicate dep</span>
                            {this.renderButton('csubj')}
                            {this.renderButton('csubjpass')}
                            {this.renderButton('ccomp')}
                        </div>
                        <div className='col s4'>
                            <br></br>
                            {this.renderButton('xcomp')}
                        </div>
                    </div>
                    <div className='row'>
                        <div><b>Noun dependents</b></div>
                        <div className='col s4'>
                            <span>Nominal dep</span>
                            {this.renderButton('nummod')}
                            {this.renderButton('appos')}
                            {this.renderButton('nmod')}
                        </div>
                        <div className='col s4'>
                            <span>Predicate dep</span>
                            {this.renderButton('acl')}
                            {this.renderButton('acl:relcl')}
                        </div>
                        <div className='col s4'>
                            <span>Modifier word</span>
                            {this.renderButton('amod')}
                            {this.renderButton('det')}
                            {this.renderButton('det:predet')}
                            {this.renderButton('neg')}
                        </div>
                    </div>
                    <div className='row'>
                        <div>Case-marking, prepositions, possessive</div>
                        <div className='col s4'>
                            {this.renderButton('case')}
                        </div>
                    </div>
                </div>
                <div className='col s4'>
                    <div className='row'>
                        <div><b>Non-core dependents of clausal predicates</b></div>
                        <div className='col s4'>
                            <span>Nominal dep</span>
                            {this.renderButton('nmod')}
                            {this.renderButton('nmod:npmod')}
                            {this.renderButton('nmod:tmod')}
                            {this.renderButton('nmod:poss')}
                        </div>
                        <div className='col s4'>
                            <span>Predicate dep</span>
                            {this.renderButton('advcl')}
                        </div>
                        <div className='col s4'>
                            <span>Modifier word</span>
                            {this.renderButton('advmod')}
                            {this.renderButton('neg')}
                        </div>
                    </div>
                    <div className='row'>
                        <div><b>Compounding and unanalyzed</b></div>
                        <div className='col s4'>
                            {this.renderButton('compound')}
                            {this.renderButton('compound:prt')}
                            <div className='emptyFiller'></div>
                            <div className='emptyFiller'></div>
                        </div>
                        <div className='col s4'>
                            {this.renderButton('mwe')}
                        </div>
                        <div className='col s4'>
                            {this.renderButton('goeswith')}
                        </div>
                    </div>
                    <div className='row'>
                        <div><b>Loose joining relations</b></div>
                        <div className='col s4'>
                            {this.renderButton('parataxis')}
                        </div>
                    </div>
                </div>
                <div className='col s4'>
                    <div className='row'>
                        <div><b>Special clausal dependents</b></div>
                        <div className='col s4'>
                            <span>Nominal dep</span>
                            {this.renderButton('discourse')}
                            {this.renderButton('expl')}
                            <div className='emptyFiller'></div>
                            <div className='emptyFiller'></div>
                        </div>
                        <div className='col s4'>
                            <span>Auxiliary</span>
                            {this.renderButton('aux')}
                            {this.renderButton('auxpass')}
                            {this.renderButton('cop')}
                        </div>
                        <div className='col s4'>
                            <span>Other</span>
                            {this.renderButton('mark')}
                            {this.renderButton('punct')}
                        </div>
                    </div>
                    <div className='row'>
                        <div><b>Coordination</b></div>
                        <div className='col s4'>
                            {this.renderButton('conj')}
                            <div className='emptyFiller'></div>
                            <div className='emptyFiller'></div>
                            <div className='emptyFiller'></div>
                        </div>
                        <div className='col s4'>
                            {this.renderButton('cc')}
                            {this.renderButton('cc:preconj')}
                        </div>
                        <div className='col s4'>
                            {this.renderButton('punct')}
                        </div>
                    </div>
                    <div className='row'>
                        <div><b>Other</b></div>
                        <div className='col s4'>
                            {this.renderButton('dep')}
                        </div>
                    </div>
                </div>
            </div>
            {this.renderInfoModal()}
        </div>)
    }
}

export default SyntaxDefinitionExplore;