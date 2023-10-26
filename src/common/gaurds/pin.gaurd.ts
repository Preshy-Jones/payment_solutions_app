import { Type, CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { JwtAuthGaurd } from './jwt-auth.gaurd';

const PinGaurd = (): Type<CanActivate> => {
  class PinGaurdMixin extends JwtAuthGaurd {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const userPin = request.user.pin;

      const bodyPin = request.body.pin;

      return userPin === bodyPin;
    }
  }

  return mixin(PinGaurdMixin);
};

export default PinGaurd;
