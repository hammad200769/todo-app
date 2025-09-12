import {
  ApiValidationErrors,
  BoolString,
  ERROR_TYPE,
  TweetSearchType,
  UserTweetSearch,
} from '@/types/types';
import {
  LANGUAGES,
  LINKS_FILTER_TYPE_TO_NUMBER_MAP,
  REPLIES_FILTER_TYPE_TO_NUMBER_MAP,
} from '@/utils/constants';
import { generateTwitterSearchURL, notifySuccess, put } from '@/utils/utils';
import clsx from 'clsx';
import { MouseEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import DialogWrapper from '../common/DialogBackground';
import ErrorsCard from '../common/ErrorsCard';
import { FormFieldError } from '../common/form';
import InputGroup from '../common/form/InputGroup';
import { CrossIcon } from '../icons';
import { formatDataForApi } from '../private-tweet-search/TweetSearchForm';
import FormSectionContainer from '../tweet-search/FormSectionContainer';
import FormSectionControlsContainer from '../tweet-search/FormSectionControlsContainer';
import FormSectionHeading from '../tweet-search/FormSectionHeading';
import InputLabel from '../tweet-search/InputLabel';
import LabelWithHelp from '../tweet-search/LabelWithHelp';
import NumberInput from '../tweet-search/NumberInput';
import RadioButtonGroup from '../tweet-search/RadioButtonGroup';
import TextInput from '../tweet-search/TextInput';

const HEADER_HEIGHT = 60;

export function getDefaultData(
  data: Omit<UserTweetSearch, 'id' | 'name' | 'userId' | 'created_at'>
): TweetSearchType {
  const defaultData: Record<string, any> = {
    ...data,
    startDate: data.start_date ? data.start_date.split('T')[0] : '',
    endDate: data.end_date ? data.end_date.split('T')[0] : '',
  };

  const numberTypes = new Set<string>([
    'min_likes',
    'min_replies',
    'min_reposts',
    'distance',
    'replies_filter',
    'links_filter',
  ]);

  for (const key in defaultData) {
    const value = defaultData[key];
    if (['from_followed_people', 'from_nearby'].includes(key)) {
      defaultData[key] = value.toString() as BoolString;
      continue;
    }

    if (numberTypes.has(key)) {
      defaultData[key] = value === null ? '' : value.toString();
      continue;
    }
    if (key === 'language') {
      defaultData[key] = value ?? 'any-language';
      continue;
    }
    defaultData[key] = value ?? '';
  }

  return defaultData as TweetSearchType;
}

type TweetSearchEditModalProps = {
  tweetSearchData: Omit<UserTweetSearch, 'created_at'>;
  onClose: VoidFunction;
  onEditSuccess: VoidFunction;
};

function TweetSearchEditModal({
  onClose,
  tweetSearchData,
  onEditSuccess,
}: TweetSearchEditModalProps) {
  const { id: searchId, name: _searchName, ...restData } = tweetSearchData;

  const {
    handleSubmit,
    register,
    formState: { errors: formErrors, isDirty },
    reset,
  } = useForm<TweetSearchType>({
    defaultValues: getDefaultData(restData),
  });

  const [searchName, setSearchName] = useState<string>(_searchName);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [apiValidationErrors, setApiValidationErrors] =
    useState<ApiValidationErrors>([]);

  function handleSearch(data: TweetSearchType) {
    const url = generateTwitterSearchURL(data);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function handleReset(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    reset();
    setSearchName(_searchName);
  }

  async function handleEditSearch(data: TweetSearchType) {
    setIsLoadingUpdate(true);
    try {
      const response = await put(`/api/user/tweet-searches/${searchId}`, {
        data: formatDataForApi(data),
        name: searchName.trim(),
      });
      if (response.ok) {
        notifySuccess('Tweet Search updated successfully.');
        setApiValidationErrors([]);
        onEditSuccess();
      } else {
        const data = await response.json();
        if (data.error.type === ERROR_TYPE.ValidationError) {
          setApiValidationErrors(data.error.data);
        } else {
          alert(data.error.message);
        }
      }
    } catch (err) {
      alert(err);
    } finally {
      setIsLoadingUpdate(false);
    }
  }

  const isSaveButtonDisabled =
    isLoadingUpdate ||
    searchName.trim() === '' ||
    (!isDirty && searchName === _searchName);

  return (
    <DialogWrapper>
      <div className='w-full dark:bg-primary-dark-light sm:w-[90%] translate-x-0 relative bg-white mx-auto md:max-w-7xl h-[90vh] rounded-t-lg'>
        <header
          className='flex-c bg-white sticky dark:bg-primary-dark rounded-t-lg px-4 shadow-[#00000040_0px_2px_3px]'
          style={{ height: HEADER_HEIGHT }}
        >
          <div className='relative grow flex-cc'>
            <h3 className='text-2xl text-center font-bold'>Edit Search</h3>
            <button
              className='pl-1 absolute right-0 cursor-pointer'
              onClick={onClose}
            >
              <CrossIcon />
            </button>
          </div>
        </header>
        <div
          className='overflow-auto rounded-b-lg pt-4 pb-12'
          style={{ height: `calc(90vh - ${HEADER_HEIGHT}px)` }}
        >
          <form className='px-4'>
            <div className='flex flex-col sm:flex-row sm:items-end gap-2'>
              <div className='grow space-y-[2px]'>
                <label
                  htmlFor='searchName'
                  className='font-medium whitespace-normal'
                >
                  Search Name
                </label>
                <input
                  id='searchName'
                  name='searchName'
                  value={searchName}
                  onChange={e => setSearchName(e.target.value)}
                  className='border border-gray-300 dark:text-white grow text-sm rounded-lg dark:bg-primary-dark dark:border-dark-mode-border focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  placeholder='Name your search (e.g. Marvel movie buzz)'
                />
              </div>
              <div className='flex-cc space-x-2'>
                <button
                  className={clsx(
                    'text-white font-bold py-2 cursor-pointer px-4 xs:px-8 rounded-sm flex-cc disabled:bg-primary/75 dark:disabled:bg-[#8f8be5bf] disabled:cursor-not-allowed ',
                    !isSaveButtonDisabled &&
                      'bg-primary hover:bg-primary-hover cta-shadow'
                  )}
                  onClick={handleSubmit(handleEditSearch)}
                  disabled={isSaveButtonDisabled}
                  type='button'
                >
                  {isLoadingUpdate && (
                    <div className='animate-spin rounded-[50%] border-t-gray-800 border-gray-300 border-[3px] h-4 w-4 mr-2'></div>
                  )}
                  Apply Changes
                </button>
                <button
                  className={clsx(
                    'cursor-pointer py-2 px-4 rounded-sm border disabled:cursor-not-allowed disabled:text-gray-300 disabled:border-gray-300 dark:disabled:text-gray-500 dark:disabled:border-gray-500',
                    (isDirty || searchName !== _searchName) &&
                      'hover:bg-gray-100 text-gray-500 border-gray-500 dark:text-gray-300 dark:border-gray-300 dark:hover:bg-primary-dark'
                  )}
                  onClick={handleReset}
                  disabled={!isDirty && searchName === _searchName}
                  type='button'
                >
                  Undo changes
                </button>
              </div>
            </div>

            {apiValidationErrors.length > 0 && (
              <div className='mt-3 grid lg:grid-cols-[0.25fr_1fr] gap-x-4'>
                <div></div>
                <ErrorsCard
                  errors={apiValidationErrors.map(error => error.message)}
                />
              </div>
            )}

            <div className='flex-cc mt-2 sm:mt-8 space-x-4'>
              <button
                className={clsx(
                  'cursor-pointer text-white font-bold py-2 px-8 rounded-sm bg-indigo-500 dark:bg-primary dark:hover:bg-primary-hover hover:bg-primary'
                )}
                onClick={handleSubmit(handleSearch)}
                type='button'
              >
                Search
              </button>
            </div>

            <div className='space-y-8 lg:space-y-12 mt-8'>
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
                      className='border border-gray-300 dark:border-dark-mode-border dark:bg-primary-dark-light text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
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
                        pattern={/^([0-9]*)$/}
                      />
                      {formErrors.min_likes?.type === 'pattern' && (
                        <FormFieldError>
                          Only positive integers are allowed
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
                      pattern={/^([0-9]*)$/}
                    />
                    {formErrors.min_replies?.type === 'pattern' && (
                      <FormFieldError>
                        Only positive integers are allowed
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
                      pattern={/^([0-9]*)$/}
                    />
                    {formErrors.min_reposts?.type === 'pattern' && (
                      <FormFieldError>
                        Only positive integers are allowed
                      </FormFieldError>
                    )}
                  </InputGroup>
                </FormSectionControlsContainer>
              </FormSectionContainer>
              <FormSectionContainer>
                <FormSectionHeading>Filters</FormSectionHeading>
                <FormSectionControlsContainer>
                  <div className='flex flex-col'>
                    <h4 className='text-lg font-medium mb-2 dark:text-neutral-gray__dark text-neutral-gray'>
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
                    <h4 className='text-lg font-medium mb-2 dark:text-neutral-gray__dark text-neutral-gray'>
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
                    <h4 className='text-lg font-medium mb-2 dark:text-neutral-gray__dark text-neutral-gray'>
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
                        id='from_followed_people'
                        value='true'
                        name='from_followed_people'
                        register={register}
                        label='From people you follow'
                      />
                    </div>
                  </div>
                  <div className='flex flex-col lg:mt-0'>
                    <h4 className='text-lg font-medium mb-2 dark:text-neutral-gray__dark text-neutral-gray'>
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
                    <InputLabel htmlFor='startDate'>From date</InputLabel>
                    <input
                      type='date'
                      id='startDate'
                      className='border border-gray-300 dark:border-dark-mode-border dark:text-soft-white dark:bg-primary-dark text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                      {...register('start_date')}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLabel htmlFor='endDate'>To date</InputLabel>
                    <input
                      type='date'
                      id='endDate'
                      className='border border-gray-300 dark:border-dark-mode-border text-sm dark:text-soft-white dark:bg-primary-dark rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
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
                      validate={value =>
                        value.trim() === '' || Number(value) > 0
                      }
                    />
                    {formErrors.distance?.type === 'validate' && (
                      <FormFieldError>
                        Distance must be greater than 0
                      </FormFieldError>
                    )}
                  </InputGroup>
                </FormSectionControlsContainer>
              </FormSectionContainer>
            </div>
          </form>
        </div>
      </div>
    </DialogWrapper>
  );
}
export default TweetSearchEditModal;
