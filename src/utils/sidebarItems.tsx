import { TSidebarItem } from './generateSidebarItems';
import { AiOutlineFileText, AiOutlineQuestionCircle } from 'react-icons/ai';
import { IoBarChartOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { BsPersonGear } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';
import { LuScrollText, LuUser } from 'react-icons/lu';
import { PiListMagnifyingGlassThin } from 'react-icons/pi';
import { MdOutlineBedroomParent } from 'react-icons/md';
import { TfiWallet } from 'react-icons/tfi';
import { RiUserStarLine } from 'react-icons/ri';
import { GoGear } from 'react-icons/go';
import { BiSupport } from 'react-icons/bi';
const sidebarItems: TSidebarItem[] = [
    {
        key: '1',
        label: 'Dashboard',
        path: '',
        icon: <IoBarChartOutline size={24} />,
    },
    {
        key: '2e',
        label: 'Space Provider',
        path: 'space-provider',
        icon: <LuUser size={24} />,
    },
    {
        key: '22',
        label: 'Space Seeker',
        path: 'space-seeker',
        icon: <LuUser size={24} />,
    },
    {
        key: '111434',
        label: 'Space Post',
        path: 'space-post',
        icon: <MdOutlineBedroomParent size={24} />,
    },
    {
        key: '11',
        label: 'Subscribed User',
        path: 'subscribed-users',
        icon: <RiUserStarLine size={24} />,
    },
    {
        key: '111',
        label: 'Dealing Details',
        path: 'dealing-details',
        icon: <PiListMagnifyingGlassThin size={24} />,
    },
    {
        key: '3',
        label: 'Settings',
        icon: <GoGear size={24} />,
        children: [
            {
                key: '33',
                label: 'Subscription',
                path: 'subscriptions',
                icon: <TfiWallet size={24} />,
            },

            {
                key: '3',
                label: 'Add Admin',
                path: 'make-admin',
                icon: <BsPersonGear size={24} />,
            },
            {
                key: '42',
                label: 'Terms & Conditions',
                path: 'terms',
                icon: <IoDocumentTextOutline size={24} />,
            },
            {
                key: '41',
                label: 'User Agreement',
                path: 'agreement',
                icon: <LuScrollText size={24} />,
            },
            {
                key: '44',
                label: 'About',
                path: 'about',
                icon: <AiOutlineFileText size={24} />,
            },
            {
                key: '442',
                label: 'Support',
                path: 'support',
                icon: <BiSupport size={24} />,
            },
            {
                key: '5',
                label: 'FAQs',
                path: 'faqs',
                icon: <AiOutlineQuestionCircle size={24} />,
            },
        ],
    },
    {
        key: '6',
        label: 'Log Out',
        path: 'login',
        icon: <TbLogout size={24} />,
    },
];

export default sidebarItems;
