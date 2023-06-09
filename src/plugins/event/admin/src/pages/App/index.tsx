/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import EventForm from '../EventForm';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={`/plugins/${pluginId}`} element={<HomePage/>} />
        <Route element={AnErrorOccurred} />
        <Route element={<EventForm/>} path={`/plugins/${pluginId}/addevent`} />
      </Routes>
    </div>
  );
};

export default App;
