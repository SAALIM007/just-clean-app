import React, {Suspense} from 'react';
import {connect} from 'react-redux';

import LoadingScreen from 'screens/loading.screen';
import {Switch, Route, BrowserRouter, withRouter} from 'react-router-dom';
import NotFoundScreen from 'screens/404.screen';
import SignInScreen from 'screens/signIn.screen';
import SideBar from './portalNavigator';
import {selectScreen} from 'helpers/screen.helper';
import {useTracker} from 'components/withTracker';


const PortalSubside = withRouter(({sideRoutes, extraRoutes, history}) => {
   useTracker(history);

    return (
        <Suspense fallback={<LoadingScreen/>}>
            <Switch>
                {sideRoutes.map((route, index) => {
                    return (
                        <Route key={route.path} exact path={route.path} component={route.screen}/>
                    )
                })}
                {extraRoutes.map((route, index) => {
                    return (
                        <Route key={route.path} exact path={route.path} component={route.screen}/>
                    )
                })}
                <Route key='404' component={NotFoundScreen}/>
            </Switch>
        </Suspense>
    );
});


const Portal = ({
                    extraRoutes,
                    sideRoutes,
                    baseLocation = '/portal/',
                    isAuthenticated,
                    user,
                    allowedType,
                }) => {

    if (!isAuthenticated)
        return <SignInScreen/>;
    if (user.type !== allowedType)
        return <NotFoundScreen/>;

    return (
        <div className='full-page'>
            <BrowserRouter basename={baseLocation}>
                <SideBar routes={sideRoutes}/>
                <div className='full-page' style={{
                    paddingLeft: selectScreen(0, 256),
                    transition: '0.4s',
                }}>
                    <PortalSubside sideRoutes={sideRoutes} extraRoutes={extraRoutes} />
                </div>
            </BrowserRouter>
        </div>
    );
};


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps)(Portal);
