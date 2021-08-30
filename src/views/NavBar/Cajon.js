import React from 'react'
import { makeStyles, Drawer,Divider } from '@material-ui/core'
import Listas from './Listas';

const drawerWidth=240;
const estilos=makeStyles(theme=>({
        drawer:{
            width: drawerWidth,
            flexShrink:0
        },
        drawerPaper:{
            width:240
        },
        toolbar:theme.mixins.toolbar
    }))

const Cajon = ({variant, open, onClose}) => {

    const clases=estilos();
    return (
        <>
            <Drawer className={clases.drawer} clases={{
                paper:clases.drawerPaper
            }} anchor="left"
                variant={variant}
                open={open}
                onClose={onClose ? onClose:null}
            >
                <div className={clases.toolbar}></div>
                <Divider/>
                <Listas/>
            </Drawer>
        </>
    )
}

export default Cajon
