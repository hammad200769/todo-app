import { TweetSearchType } from '@/types/types';
import {
  LANGUAGES,
  LINKS_FILTER_TYPE_TO_NUMBER_MAP,
  POSITIVE_INTEGER_REGEX,
  REPLIES_FILTER_TYPE_TO_NUMBER_MAP,
} from '@/utils/constants';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormFieldError } from '../common/form';
import InputGroup from '../common/form/InputGroup';
import FormSectionContainer from './FormSectionContainer';
import FormSectionControlsContainer from './FormSectionControlsContainer';
import FormSectionHeading from './FormSectionHeading';
import InputLabel from './InputLabel';
import LabelWithHelp from './LabelWithHelp';
import NumberInput from './NumberInput';
import RadioButtonGroup from './RadioButtonGroup';
import TextInput from './TextInput';

type FormSectionsContainerProps = {
  register: UseFormRegister<TweetSearchType>;
  formErrors: FieldErrors<TweetSearchType>;
};

function FormSectionsContainer({
  register,
  formErrors,
}: FormSectionsContainerProps) {
  return (
    <>
      <FormSectionContainer>
        <FormSectionHeading>Words</FormSectionHeading>
        <FormSectionControlsContainer>
          <InputGroup>
            <LabelWithHelp
              labelFor='all_these_words'
              helpText="Example: software app => contains both 'software' and 'app'"
            >
              Include All of these Words
            </LabelWithHelp>
            <TextInput
              name='all_these_words'
              placeholder='software app application'
              register={register}
            />
          </InputGroup>
          <InputGroup>
            <LabelWithHelp
              labelFor='exact_match_phrase'
              helpText="Example: software development using ai => contains the exact phrase  'software development using ai'"
            >
              Include this Exact Phrase
            </LabelWithHelp>
            <TextInput
              name='exact_match_phrase'
              placeholder='software development using ai'
              register={register}
            />
          </InputGroup>
          <InputGroup>
            <LabelWithHelp
              labelFor='any_these_words'
              helpText="Example: gpt chatgpt => contains either 'gpt' or 'chatgpt' (or both)"
            >
              Include Any of these Words
            </LabelWithHelp>
            <TextInput
              name='any_these_words'
              placeholder='gpt ai chatgpt'
              register={register}
            />
          </InputGroup>
          <InputGroup>
            <LabelWithHelp
              labelFor='excluded_words'
              helpText="Example: devops testing => does not contain 'devops' and does not contain 'testing'"
            >
              Exclude these Words
            </LabelWithHelp>
            <TextInput
              name='excluded_words'
              placeholder='devops testing'
              register={register}
            />
          </InputGroup>
          <InputGroup>
            <LabelWithHelp
              labelFor='hashtags'
              helpText="Example: #dev #code => contains either the hashtag '#dev' or '#code' (or both)"
            >
              Hashtags
            </LabelWithHelp>
            <TextInput
              name='hashtags'
              placeholder='#development #code'
              register={register}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor='language'>Language</InputLabel>
            <select
              {...register('language')}
              id='language'
              className='border border-gray-300 dark:border-dark-mode-border dark:text-soft-white dark:bg-primary-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            >
              {LANGUAGES.map(language => (
                <option key={language.code} value={language.code}>
                  {language.name}
                </option>
              ))}
            </select>
          </InputGroup>
        </FormSectionControlsContainer>
      </FormSectionContainer>

      <FormSectionContainer>
        <FormSectionHeading>Accounts</FormSectionHeading>
        <FormSectionControlsContainer>
          <InputGroup>
            <LabelWithHelp
              labelFor='from_accounts'
              helpText="Example: @john @jake => sent from '@john' or sent from '@jake'"
            >
              From these Accounts
            </LabelWithHelp>
            <TextInput
              name='from_accounts'
              placeholder='@john_doe'
              register={register}
            />
          </InputGroup>
          <InputGroup>
            <LabelWithHelp
              labelFor='to_accounts'
              helpText="Example: @john @jake => sent in reply to '@john' or in reply to '@jake'"
            >
              To these Accounts
            </LabelWithHelp>
            <TextInput
              name='to_accounts'
              placeholder='@jane_doe'
              register={register}
            />
          </InputGroup>
          <InputGroup>
            <LabelWithHelp
              labelFor='mention_accounts'
              helpText="Example: @john @jake => mentions '@john' or mentions '@jake'"
            >
              Mentioning these Accounts
            </LabelWithHelp>
            <TextInput
              name='mention_accounts'
              placeholder='@daniel_smith'
              register={register}
            />
          </InputGroup>
        </FormSectionControlsContainer>
      </FormSectionContainer>
      <FormSectionContainer>
        <FormSectionHeading>Engagement</FormSectionHeading>
        <FormSectionControlsContainer>
          <InputGroup>
            <InputLabel htmlFor='min_likes'>Min Likes</InputLabel>
            <div className='space-y-1'>
              <NumberInput
                register={register}
                name='min_likes'
                min='0'
                placeholder='10'
                hasError={!!formErrors.min_likes}
                pattern={POSITIVE_INTEGER_REGEX}
              />
              {formErrors.min_likes?.type === 'pattern' && (
                <FormFieldError>
                  Only integers greater than or equal to zero are allowed
                </FormFieldError>
              )}
            </div>
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor='min_replies'>Min Replies</InputLabel>
            <NumberInput
              register={register}
              name='min_replies'
              min='0'
              placeholder='10'
              hasError={!!formErrors.min_replies}
              pattern={POSITIVE_INTEGER_REGEX}
            />
            {formErrors.min_replies?.type === 'pattern' && (
              <FormFieldError>
                Only integers greater than or equal to zero are allowed
              </FormFieldError>
            )}
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor='min_reposts'>Min Retweets</InputLabel>
            <NumberInput
              register={register}
              name='min_reposts'
              min='0'
              placeholder='10'
              hasError={!!formErrors.min_reposts}
              pattern={POSITIVE_INTEGER_REGEX}
            />
            {formErrors.min_reposts?.type === 'pattern' && (
              <FormFieldError>
                Only integers greater than or equal to zero are allowed
              </FormFieldError>
            )}
          </InputGroup>
        </FormSectionControlsContainer>
      </FormSectionContainer>
      <FormSectionContainer>
        <FormSectionHeading>Filters</FormSectionHeading>
        <FormSectionControlsContainer>
          <div className='flex flex-col'>
            <h4 className='text-lg font-medium mb-2 text-neutral-gray dark:text-neutral-gray__dark'>
              Replies
            </h4>
            <div className='space-y-2'>
              <RadioButtonGroup
                id='withReplies'
                value={REPLIES_FILTER_TYPE_TO_NUMBER_MAP.with.toString()}
                name='replies_filter'
                register={register}
                label='Include replies and original tweet'
              />
              <RadioButtonGroup
                id='onlyReplies'
                value={REPLIES_FILTER_TYPE_TO_NUMBER_MAP.only.toString()}
                name='replies_filter'
                register={register}
                label='Only show replies'
              />
              <RadioButtonGroup
                id='noReplies'
                value={REPLIES_FILTER_TYPE_TO_NUMBER_MAP.none.toString()}
                name='replies_filter'
                register={register}
                label="Don't show replies"
              />
            </div>
          </div>
          <div className='flex flex-col lg:mt-0'>
            <h4 className='text-lg dark:text-soft-white font-medium mb-2 text-neutral-gray'>
              Links{' '}
            </h4>
            <div className='space-y-2'>
              <RadioButtonGroup
                id='withLinks'
                value={LINKS_FILTER_TYPE_TO_NUMBER_MAP.with.toString()}
                name='links_filter'
                register={register}
                label='Include tweets with links'
              />
              <RadioButtonGroup
                id='onlyLinks'
                value={LINKS_FILTER_TYPE_TO_NUMBER_MAP.only.toString()}
                name='links_filter'
                register={register}
                label='Only show tweets with links'
              />
              <RadioButtonGroup
                id='noLinks'
                value={LINKS_FILTER_TYPE_TO_NUMBER_MAP.none.toString()}
                name='links_filter'
                register={register}
                label="Don't show tweets with links"
              />
            </div>
          </div>
          <div className='flex flex-col lg:mt-0'>
            <h4 className='text-lg dark:text-soft-white font-medium mb-2 text-neutral-gray'>
              People
            </h4>
            <div className='space-y-2'>
              <RadioButtonGroup
                id='fromAnyone'
                value='false'
                name='from_followed_people'
                register={register}
                label='From anyone'
              />
              <RadioButtonGroup
                id='fromFollowedPeople'
                value='true'
                name='from_followed_people'
                register={register}
                label='From people you follow'
              />
            </div>
          </div>
          <div className='flex flex-col lg:mt-0'>
            <h4 className='text-lg dark:text-soft-white font-medium mb-2 text-neutral-gray'>
              Location
            </h4>
            <div className='space-y-2'>
              <RadioButtonGroup
                id='fromAnywhere'
                value='false'
                name='from_nearby'
                register={register}
                label='Anywhere'
              />
              <RadioButtonGroup
                id='fromNearby'
                value='true'
                name='from_nearby'
                register={register}
                label='Near you'
              />
            </div>
          </div>
        </FormSectionControlsContainer>
      </FormSectionContainer>

      <FormSectionContainer>
        <FormSectionHeading>Dates</FormSectionHeading>
        <FormSectionControlsContainer>
          <InputGroup>
            <InputLabel htmlFor='start_date'>From date</InputLabel>
            <input
              type='date'
              id='startDate'
              className='border border-gray-300 dark:border-dark-mode-border text-sm rounded-lg dark:bg-primary-dark dark:text-soft-white focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              {...register('start_date')}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor='endDate'>To date</InputLabel>
            <input
              type='date'
              id='endDate'
              className='border border-gray-300 dark:border-dark-mode-border text-sm rounded-lg dark:bg-primary-dark dark:text-soft-white focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
              {...register('end_date')}
            />
          </InputGroup>
        </FormSectionControlsContainer>
      </FormSectionContainer>

      <FormSectionContainer>
        <FormSectionHeading>Location</FormSectionHeading>
        <FormSectionControlsContainer>
          <InputGroup>
            <InputLabel htmlFor='location'>Location</InputLabel>
            <TextInput
              name='location'
              register={register}
              placeholder='Chicago'
            />
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor='distance'>Distance (miles)</InputLabel>
            <NumberInput
              register={register}
              name='distance'
              min='0'
              placeholder='10'
              hasError={!!formErrors.distance}
              validate={value => value.trim() === '' || Number(value) > 0}
            />
            {formErrors.distance?.type === 'validate' && (
              <FormFieldError>Distance must be greater than 0</FormFieldError>
            )}
          </InputGroup>
        </FormSectionControlsContainer>
      </FormSectionContainer>
    </>
  );
}

export default FormSectionsContainer;
