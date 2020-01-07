import React, {Component} from 'react'
import SemanticsInput from './lanlegis_semantics_input'
import SemanticsOutput from './lanlegis_semantics_output'


class SemanticsWrapper extends Component{

    render(){
        return (<div className={'row stretchheight ' +((this.props.mother_state.progress=='semantics')?'SemanticWrapper':'hidden')}>
            <div className='SemanticInput col s4'>
                <SemanticsInput mother_state={this.props.mother_state} mother_this={this.props.mother_this}></SemanticsInput>
            </div>
            <div className='SemanticOutput col s8'>
                <SemanticsOutput mother_state={this.props.mother_state} mother_this={this.props.mother_this}></SemanticsOutput>
            </div>
        </div>)
    }
}

export default SemanticsWrapper;