import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../../pages/consts';
import { getTokenFromLocalStorage } from '..';

const PUBLIC_PAGES = [PAGES.HOME, PAGES.SIGN_UP, PAGES.LOGIN];


