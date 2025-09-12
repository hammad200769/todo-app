type CustomErrorFunctionOptions = {
  fieldKey: string;
  fieldLabel: string;
};

export const validationErrors: Record<
  string,
  (context: CustomErrorFunctionOptions) => string
> = {
  'number.base': context => {
    return `${context.fieldLabel} must be a number`;
  },
  'string.empty': context => {
    return `${context.fieldLabel} is not allowed to be empty`;
  },
  'object.unknown': context => {
    return `"${context.fieldLabel}" field is not allowed`;
  },
};
