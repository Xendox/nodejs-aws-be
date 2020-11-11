import { Container } from 'inversify';

const container = new Container();

// New decorator syntax
const lazyInject = (identifier: any) => (target: any, key: string, descriptor?: any) => {
	if (descriptor) {
		descriptor.initializer = () => container.get(identifier);
	} else {
		Object.defineProperty(target, key, {
			get: () => container.get(identifier),
			enumerable: true,
		});
	}
};

export {
	container,
	lazyInject,
};