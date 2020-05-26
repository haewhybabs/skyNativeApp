import { DrawerNavigator,createAppContainer } from 'react-navigation';
import Dashboard from './Dashboard';

const MyDrawerNavigator = new DrawerNavigator({
    Home: Dashboard,
}, {
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    contentOptions: {
        activeTintColor: '#fff',
        activeBackgroundColor: '#6b52ae',
    },
});

const MyApp = createAppContainer(MyDrawerNavigator);

export default MyDrawerNavigator;