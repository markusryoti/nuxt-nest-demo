import { FastifyRequest } from 'fastify';
import { JwtClaims } from './jwt-claims';

export type AuthenticatedRequest = FastifyRequest & { user: JwtClaims };
