import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
    let AppComponent;
    let AppDOM;

    beforeEach(async () => {
        await act(async () => {
            AppComponent = render(<App />);
        });
        AppDOM = AppComponent.container.firstChild;
    });

    test('Default number of events is 32', ({ given, when, then }) => {
        given('the app is loaded', () => {

        });

        when('the user hasn’t specified a number', () => {

        });

        then('the default number of events displayed should be 32', async () => {
            const numberInput = within(AppDOM).getByLabelText('Number of events:');
            await waitFor(() => {
                expect(numberInput.value).toBe('32');
            });
        });
    });

    test('User can change the number of events', ({ given, when, then }) => {
        given('the user wants to change the number of events', () => {

        });

        when('the user types a new number in the textbox', async () => {
            const user = userEvent.setup();
            const numberInput = within(AppDOM).getByLabelText('Number of events:');
            await act(async () => {
                await user.clear(numberInput);
                await user.type(numberInput, '10');
            });
        });

        then('the app should display the specified number of events', async () => {
            const numberInput = within(AppDOM).getByLabelText('Number of events:');
            await waitFor(() => {
                expect(numberInput.value).toBe('10');
            });
        });
    });
});
