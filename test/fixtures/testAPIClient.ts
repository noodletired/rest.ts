import { createConsumer } from '@noodletired/rest-ts-axios';
import axios from 'axios';
import { todoAPI } from './testAPI';

export function getClient(baseURL: string) {
    return createConsumer(todoAPI, axios.create({
        baseURL: baseURL
    }));
}
