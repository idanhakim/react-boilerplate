import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from './context';
import usersApi from './api';

class UsersProvider extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data || [],
            loading: false,
            selected: null
        };

        this.setSelected = (selected) => {
            this.setState(() => ({ selected }));
        };

        this.clearSelected = () => {
            this.setState(() => ({ selected: null }));
        };

        this.fetch = (params, cb) => {
            console.log('params', params); // eslint-disable-line no-console
            return this.setState((prevState) => {
                console.log('prevState', prevState); // eslint-disable-line no-console
                return { loading: !prevState.loading };
            }, (a) => {
                console.log('a', a); // eslint-disable-line no-console
                return usersApi.fetch(params).then((data) => {
                    console.log('data', data); // eslint-disable-line no-console
                    return this.setState((prevState) => {
                        console.log('prevState', prevState); // eslint-disable-line no-console
                        return { data, loading: !prevState.loading };
                    }, cb);
                });
            });
        };
    }

    render() {
        const { loading, data, selected } = this.state;
        const { children } = this.props;
        return (
            <Provider value={{
                data,
                loading,
                selected,
                fetch: this.fetch,
                setSelected: this.setSelected,
                clearSelected: this.clearSelected
            }}
            >
                {children}
            </Provider>
        );
    }
}

UsersProvider.defaultProps = {
    data: []
};

UsersProvider.propTypes = {
    children: PropTypes.element.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({}))
};

export default UsersProvider;