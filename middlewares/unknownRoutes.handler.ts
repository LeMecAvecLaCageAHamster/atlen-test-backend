import { NotFoundException } from '../utils/exceptions';

/**
 * For every route that doesn't exists
 */
export const UnknownRoutesHandler = () => {
	throw new NotFoundException(`La resource demandée n'existe pas`)
}