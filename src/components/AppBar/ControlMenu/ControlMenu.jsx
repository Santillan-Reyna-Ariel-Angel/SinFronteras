import React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { showMenu, setShowMenu } from './../../Sidebar/Sidebar';

export const ControlMenu = () => {
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={showMenu}
              size="small"
              onChange={(event) => setShowMenu(event.target.checked)}
            />
          }
          label="Menu"
          labelPlacement="start"
        />
      </FormGroup>
    </>
  );
};
