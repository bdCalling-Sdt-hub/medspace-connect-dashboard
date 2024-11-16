import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notificationApi } from './notificationApi';

export interface TNotification {
    _id: string;
    title: string;
    message: string;
    receiverId: string;
    type: string;
    data: Data;
    status: string;
    createdAt: string;
}

export interface Data {
    conversationId: string;
    messageId: string;
}

export interface NotificationState {
    notifications: TNotification[];
    unreadCount: number;
}

const initialState: NotificationState = {
    notifications: [],
    unreadCount: 0,
};

const notificationSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addNotification: (state, action: PayloadAction<TNotification>) => {
            state.notifications.unshift(action.payload);
            state.unreadCount += 1;
        },
    },

    extraReducers: (builder) => {
        builder.addMatcher(notificationApi.endpoints.getNotification.matchFulfilled, (_state, action) => {
            return {
                notifications: action.payload.notifications,
                unreadCount: action.payload.unreadCount,
            };
        });
    },
});

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
