import { IMATeapotHttpException } from '@senhung/http-exceptions';
import { todoAPI } from './testAPI';
import { buildRouter } from '@noodletired/rest-ts-express';

export const router = buildRouter(todoAPI, (builder) => builder
    .simpleQueryParams((req) => {
        return {
            query1: req.query.mandatory,
            query2: req.query.union === 'true'
        };
    })
    .pathParams((req) => {
        return {
            path: req.path,
            kind: req.params['kind'],
            id: req.params['id']
        };
    })
    .noRepsonseEndpoint(async (req, res) => {
        // no-op. Will 404
    })
    .simpleRequestBody(async (req) => {
        return {
            id: 'deadbeef',
            ...req.body
        };
    })
    .constrainedRequestBody(async (req) => {
        return { ...req.body };
    })
    .simpleGet(() => 'OK')
    .simplePatch(() => 'OK')
    .simplePost(() => 'OK')
    .simplePut(() => 'OK')
    .simpleDelete(() => 'OK')
    .noTemplateString(() => 'OK')
    .constructorBodyAndResponse((req) => {
        return {
            happy: req.body.kind === 'cat',
            lyrics: req.body.message
        };
    })
    .protoBodyAndResponse((req) => {
        return {
            cats: req.body.messages,
            isEnabled: req.body.kind === 'person'
        };
    })
    .optionalQueryParams(async (req, res) => {
        res.end(); // no-op, but does not 404
    })
    .teapotError(() => {
        throw new IMATeapotHttpException();
    })
    .abortRequest(async (req, res) => {
        let aborted = false;
        req.on('close', () => {
            aborted = true;
        });

        const delay = parseInt(req.query.delay);
        const slices = 10;
        const sliceDelay = delay / slices;
        for (let i = 1; i <= slices; ++i) {
            if (aborted) {
                console.debug('Aborted!');
                break;
            }
            console.debug(`Doing work slice ${i}...`);
            await new Promise(r => setTimeout(r, sliceDelay));
        }

        return 'OK';
    })
);
