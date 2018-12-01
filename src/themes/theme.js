/* eslint-disable no-fallthrough */
import deployConfig from '../config/themeName';

const theme = (brandNme = deployConfig.theme) => {
    let header; let tabs; let
        back;
    switch (brandNme) {
    case 'pandaqh01':
        header = {
            color: '#AB956D',
            background: '#f3f3f3',
            fontColor: '#F7F7F7'
        };
        tabs = {

        };
        back = {};
    case 'pandaqh02':
        header = {
            color: '#Aff',
            background: '#f3f3f3',
            fontColor: '#F7F7F7'
        };
        tabs = {

        };
        back = {};
    default:
    }
    return { header, tabs, back };
};

export default theme;
