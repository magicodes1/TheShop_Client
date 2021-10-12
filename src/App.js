import React from 'react';
import Wrapper from './Components/Wrapper';
import Account from './Components/Account/Account';
import TheShopContext from './Contexts/TheShopContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
	return (
		<TheShopContext>
			<Router>
				<Switch>
					<Route path='/login' component={Account} />
					<Route path='/register' component={Account} />

					<Route path='/'>
						<Wrapper />
					</Route>
				</Switch>
			</Router>
		</TheShopContext>
	);
};

export default App;
