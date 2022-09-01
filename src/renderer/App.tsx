import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
  FluentProvider,
  makeStyles,
  teamsLightTheme,
} from '@fluentui/react-components';
import Home from './pages/Home';
import './App.css';
import Project from './pages/Project';
import DatasetCheck from './pages/DatasetCheck';
import TrainingModel from './pages/TrainingModel';

const useStyles = makeStyles({
  main: {
    maxWidth: '1024px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default function App() {
  const classes = useStyles();

  return (
    <FluentProvider theme={teamsLightTheme}>
      <div className={classes.main}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/project/:id/dataset" element={<DatasetCheck />} />
            <Route
              path="/project/:id/training-model"
              element={<TrainingModel />}
            />
          </Routes>
        </Router>
      </div>
    </FluentProvider>
  );
}
