import React from 'react'
import Heading from '../../../components/Heading'
import Steps from '../../../components/Steps'
import Form from '../../../components/Form'

export const HomeView = () => (
	<div>
		<Heading />
		<Steps />
		<Form onSubmit={(values) => { alert(JSON.stringify(values, null, 2)) }} />
	</div>
)

export default HomeView