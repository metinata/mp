import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import Social from '../../components/Social'
import Footer from '../../components/Footer'

export const PageLayout = ({ children }) => (
	<div>
		<div className='container'>
			<IndexLink to='/' title='Mamas&amp;Papas' className='logo'></IndexLink>
			<Social />
			{children}
		</div>
		<Footer />
	</div>
)
PageLayout.propTypes = {
	children: PropTypes.node,
}

export default PageLayout
