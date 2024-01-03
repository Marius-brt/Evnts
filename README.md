[![npm version](https://img.shields.io/npm/v/@marius.brt/evnts)](https://www.npmjs.com/package/evnts)
[![licence](https://img.shields.io/npm/l/@marius.brt/evnts)](https://www.npmjs.com/package/evnts)

# Evnts

> Evnts is a simple library to manage events in your React application. It's allow you to share states between
> components or to access state data from anywhere in your application. It's fully reactive and easy to use.

## Table of contents

- [Evnts](#Evnts)
    - [Table of contents](#table-of-contents)
    - [Installation](#installation)
    - [Usage](#usage)
        - [Create a new event](#create-a-new-event)
        - [Event options](#event-options)
        - [useEvnt](#useevnt)
        - [Access an event from anywhere](#access-an-event-from-anywhere)
        - [useBoolEvnt](#useboolevnt)
        - [ToggleEvnt component](#toggleevnt-component)
        - [Persist an event](#persist-an-event)
    - [Authors](#authors)
    - [License](#license)

## Installation

To install and set up the library, run:

```sh
$ npm install @marius.brt/evnts
```

Or if you prefer using Yarn:

```sh
$ yarn add @marius.brt/evnts
```

## Usage

### Create a new event

To create a new event, you need to use the `createEvent` function. This function takes two parameters:

- `name`: The name of the event
- `initialValue`: The initial value of the event
- `options`: The options of the event

`myEvent.ts`

```ts
import {createEvent} from '@marius.brt/evnts';

export const myEvent = createEvent('myEvent', 'Hello world !');
```

### Event options

The `createEvent` function takes an optional third parameter: the options of the event. The options are:

- `persist` (`boolean`): If it's set to `true`, the event will be persisted in the storage. The default value
  is `false`.
- `onSave` (`(value: T) => string`): This function is called when the event is saved in the storage. It takes the
  current value and return a string that will be stored in the storage. The default way is `JSON.stringify`.
- `onLoad` (`(value: string) => T`): This function is called when the event is loaded from the storage. It takes the
  value stored and set the initialize state to this value. The default way is `JSON.parse`.
- `storage` (`Storage`): The storage to use. The default value is `localStorage`.
- `storageKey` (`string`): The key to use in the storage. The default value `evnts-[event name]`.
- `setDefaultIfFailedLoading` (`boolean`): If it's set to `true`, the event will be set to the initial value if the
  loading failed. It's enabled by default.

### useEvnt

The `useEvnt` hook is used to get the current value of an event. It takes one parameter: the event to use. It returns
multiple values:

- `value`: The current value of the event
- `setValue`: A function to set the value of the event

```tsx
import {useEvnt} from '@marius.brt/evnts';
import {myEvent} from './myEvent';

const MyComponent = () => {
    const [value, setValue] = useEvnt(myEvent);

    return (
        <div>
            <p>{value}</p>
            <button onClick={() => setValue('Hello everyone !')}>Change value</button>
        </div>
    );
};
```

### Access an event from anywhere

To access an event from anywhere in your application, you need to import your event. Here is an example:

```ts
import {myEvent} from './myEvent';

const updateTimestamp = () => {
    myEvent.setValue(Date.now());
};
```

Now you can call the `updateTimestamp` function from anywhere in your application.

```tsx
import {myEvent} from './myEvent';

const MyComponent = () => {
    const [value] = useEvnt(myEvent);

    return (
        <div>
            <p>{value}</p>
            <button onClick={updateTimestamp}>Update timestamp</button>
        </div>
    );
};
```

In this example, the timestamp will be updated when the button is clicked.

### useBoolEvnt

The `useBoolEvnt` hook is used to get the current value of a boolean event. It takes one parameter: the event to use. It
returns multiple values:

- `value`: The current value of the event
- `setValue`: A function to set the value of the event
- `toggle`: A function to toggle the value of the event

```tsx
import {useBoolEvnt} from '@marius.brt/evnts';
import {myBooleanEvent} from './myEvent';

const MyComponent = () => {
    const {value, setValue, toggle} = useBoolEvnt(myBooleanEvent);

    return (
        <div>
            <p>{value ? 'true' : 'false'}</p>
            <button onClick={() => setValue(true)}>Set to true</button>
            <button onClick={() => setValue(false)}>Set to false</button>
            <button onClick={toggle}>Toggle</button>
        </div>
    );
};
```

### ToggleEvnt component

The `ToggleEvnt` component is used to show children only if the event is `true`. It takes multiple parameters:

- `event`: The event to use
- `invert`: If it's set to `true`, the children will be shown only if the event is `false`.

Here is an example:

```tsx
import {ToggleEvnt} from '@marius.brt/evnts';
import {myBooleanEvent} from './myEvent';

const MyComponent = () => {
    return (
        <div>
            <ToggleEvnt event={myBooleanEvent}>
                <p>Hello world !</p>
            </ToggleEvnt>
            <button onClick={() => myBooleanEvent.setValue(true)}>Show</button>
        </div>
    );
};
```

### Persist an event

To persist an event, you need to set the `persist` option to `true` when you create the event. Here is an example:

```ts
import {createEvent} from '@marius.brt/evnts';

export const myEvent = createEvent('myEvent', 'Hello world !', {persist: true});
```

Now the event will be persisted in the storage. If you want to change the storage, you can use the `storage` option.

## Authors

**Marius Brouty** - [Portolio](https://mariusbrt.com)

## License

[MIT License](License.txt) © Marius Brouty