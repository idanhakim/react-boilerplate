import React from 'react';
import './styles.css';
import ThemesConsumer from '../contexts/themes/consumer';
import UsersConsumer from '../../api/users/consumer';
import ProjectsConsumer from '../../api/projects/consumer';
import Form from '../Form';
import List from '../List';

function Dashboard() {
    return (
        <div>
            <UsersConsumer render={userProps => (
                <ProjectsConsumer render={projectsProps => (
                    <div>
                        <h2>
                            Dashboard
                        </h2>
                        <List {...userProps} />
                        <List {...projectsProps} />
                        <ThemesConsumer />
                        <ThemesConsumer render={() => (
                            <div>
                                nuuuu
                            </div>
                        )}
                        />
                        <Form />
                    </div>
                )}
                />
            )}
            />

        </div>
    );
}

export default Dashboard;
