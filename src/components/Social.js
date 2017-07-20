import React from 'react'
import { IndexLink, Link } from 'react-router'

export const Social = () => (
    <div className='social-wrap top'>
        <Link to='#facebook' target='_blank' title='Facebook' className='social facebook'></Link>
        <Link to='#twitter' target='_blank' title='Twitter' className='social twitter'></Link>
        <Link to='#instagram' target='_blank' title='Instagram' className='social instagram'></Link>
    </div>
)

export default Social