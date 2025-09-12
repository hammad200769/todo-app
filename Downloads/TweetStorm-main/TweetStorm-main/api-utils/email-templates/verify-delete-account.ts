type Props = {
  verificationCode: number;
  homeAddressLink: string;
};

export const verifyDeleteAccountTemplate = ({
  verificationCode,
  homeAddressLink,
}: Props) => `
      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
          background-color: #edf2f7;
          margin: 0;
          padding: 0;
          width: 100%;
        "
      >
        <tbody>
          <tr>
            <td
              align="center"
              style="
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
                  Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                  'Segoe UI Emoji', 'Segoe UI Symbol';
              "
            >
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="
                  box-sizing: border-box;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                    Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
                    'Segoe UI Emoji', 'Segoe UI Symbol';
                  margin: 0;
                  padding: 0;
                  width: 100%;
                "
              >
                <tbody>
                  <tr>
                    <td
                      style="
                        box-sizing: border-box;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                          Roboto, Helvetica, Arial, sans-serif,
                          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                        padding: 25px 0;
                        text-align: center;
                      "
                    >
                      <a
                    href="${homeAddressLink}"
                        style="
                          box-sizing: border-box;
                          font-family: -apple-system, BlinkMacSystemFont,
                            'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                            'Apple Color Emoji', 'Segoe UI Emoji',
                            'Segoe UI Symbol';
                          color: #3d4852;
                          font-size: 19px;
                          font-weight: bold;
                          text-decoration: none;
                          display: inline-block;
                        "
                      >
                        TweetStorm.ai - AI-powered Tweet Generator
                      </a>
                    </td>
                  </tr>
  
                  <tr>
                    <td
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        box-sizing: border-box;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                          Roboto, Helvetica, Arial, sans-serif,
                          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                        background-color: #edf2f7;
                        border-bottom: 1px solid #edf2f7;
                        border-top: 1px solid #edf2f7;
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        border: hidden !important;
                      "
                    >
                      <table
                        class="m_116805045725260595inner-body"
                        align="center"
                        width="570"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          box-sizing: border-box;
                          font-family: -apple-system, BlinkMacSystemFont,
                            'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                            'Apple Color Emoji', 'Segoe UI Emoji',
                            'Segoe UI Symbol';
                          background-color: #ffffff;
                          border-color: #e8e5ef;
                          border-radius: 2px;
                          border-width: 1px;
                          margin: 0 auto;
                          padding: 0;
                          width: 570px;
                        "
                      >
                        <tbody>
                          <tr>
                            <td
                              style="
                                box-sizing: border-box;
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                  'Apple Color Emoji', 'Segoe UI Emoji',
                                  'Segoe UI Symbol';
                                max-width: 100vw;
                                padding: 32px;
                              "
                            >
                              <h1
                                style="
                                  box-sizing: border-box;
                                  font-family: -apple-system, BlinkMacSystemFont,
                                    'Segoe UI', Roboto, Helvetica, Arial,
                                    sans-serif, 'Apple Color Emoji',
                                    'Segoe UI Emoji', 'Segoe UI Symbol';
                                  color: #3d4852;
                                  font-size: 18px;
                                  font-weight: bold;
                                  margin-top: 0;
                                  text-align: left;
                                "
                              >
                                Hello!
                              </h1>
                              <p
                                style="
                                  box-sizing: border-box;
                                  font-family: -apple-system, BlinkMacSystemFont,
                                    'Segoe UI', Roboto, Helvetica, Arial,
                                    sans-serif, 'Apple Color Emoji',
                                    'Segoe UI Emoji', 'Segoe UI Symbol';
                                  font-size: 16px;
                                  line-height: 1.5em;
                                  margin-top: 0;
                                  text-align: left;
                                "
                              >
                                Please Enter this code to verify your account deletion.
                              </p>
                              <table
                                align="center"
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  box-sizing: border-box;
                                  font-family: -apple-system, BlinkMacSystemFont,
                                    'Segoe UI', Roboto, Helvetica, Arial,
                                    sans-serif, 'Apple Color Emoji',
                                    'Segoe UI Emoji', 'Segoe UI Symbol';
                                  margin: 30px auto;
                                  padding: 0;
                                  text-align: center;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        box-sizing: border-box;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI', Roboto,
                                          Helvetica, Arial, sans-serif,
                                          'Apple Color Emoji', 'Segoe UI Emoji',
                                          'Segoe UI Symbol';
                                      "
                                    >
                                      <table
                                        width="100%"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="
                                          box-sizing: border-box;
                                          font-family: -apple-system,
                                            BlinkMacSystemFont, 'Segoe UI', Roboto,
                                            Helvetica, Arial, sans-serif,
                                            'Apple Color Emoji', 'Segoe UI Emoji',
                                            'Segoe UI Symbol';
                                        "
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              style="
                                                box-sizing: border-box;
                                                font-family: -apple-system,
                                                  BlinkMacSystemFont, 'Segoe UI',
                                                  Roboto, Helvetica, Arial,
                                                  sans-serif, 'Apple Color Emoji',
                                                  'Segoe UI Emoji',
                                                  'Segoe UI Symbol';
                                              "
                                            >
                                              <table
                                                border="0"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                style="
                                                  box-sizing: border-box;
                                                  font-family: -apple-system,
                                                    BlinkMacSystemFont, 'Segoe UI',
                                                    Roboto, Helvetica, Arial,
                                                    sans-serif,
                                                    'Apple Color Emoji',
                                                    'Segoe UI Emoji',
                                                    'Segoe UI Symbol';
                                                "
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      style="
                                                        box-sizing: border-box;
                                                        font-family: -apple-system,
                                                          BlinkMacSystemFont,
                                                          'Segoe UI', Roboto,
                                                          Helvetica, Arial,
                                                          sans-serif,
                                                          'Apple Color Emoji',
                                                          'Segoe UI Emoji',
                                                          'Segoe UI Symbol';
                                                      "
                                                    >
                                                     <h1>${verificationCode}</h1>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <p
                                style="
                                  box-sizing: border-box;
                                  font-family: -apple-system, BlinkMacSystemFont,
                                    'Segoe UI', Roboto, Helvetica, Arial,
                                    sans-serif, 'Apple Color Emoji',
                                    'Segoe UI Emoji', 'Segoe UI Symbol';
                                  font-size: 16px;
                                  line-height: 1.5em;
                                  margin-top: 0;
                                  text-align: left;
                                "
                              >
                                If you don't want to delete your account, no further
                                action is required.
                              </p>
                              <p
                                style="
                                  box-sizing: border-box;
                                  font-family: -apple-system, BlinkMacSystemFont,
                                    'Segoe UI', Roboto, Helvetica, Arial,
                                    sans-serif, 'Apple Color Emoji',
                                    'Segoe UI Emoji', 'Segoe UI Symbol';
                                  font-size: 16px;
                                  line-height: 1.5em;
                                  margin-top: 0;
                                  text-align: left;
                                "
                              >
                                Regards,<br />
                                TweetStorm
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style="
                        box-sizing: border-box;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
                          Roboto, Helvetica, Arial, sans-serif,
                          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                      "
                    >
                      <table
                        align="center"
                        width="570"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          box-sizing: border-box;
                          font-family: -apple-system, BlinkMacSystemFont,
                            'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                            'Apple Color Emoji', 'Segoe UI Emoji',
                            'Segoe UI Symbol';
                          margin: 0 auto;
                          padding: 0;
                          text-align: center;
                          width: 570px;
                        "
                      >
                        <tbody>
                          <tr>
                            <td
                              align="center"
                              style="
                                box-sizing: border-box;
                                font-family: -apple-system, BlinkMacSystemFont,
                                  'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
                                  'Apple Color Emoji', 'Segoe UI Emoji',
                                  'Segoe UI Symbol';
                                max-width: 100vw;
                                padding: 32px;
                              "
                            >
                              <p
                                style="
                                  box-sizing: border-box;
                                  font-family: -apple-system, BlinkMacSystemFont,
                                    'Segoe UI', Roboto, Helvetica, Arial,
                                    sans-serif, 'Apple Color Emoji',
                                    'Segoe UI Emoji', 'Segoe UI Symbol';
                                  line-height: 1.5em;
                                  margin-top: 0;
                                  color: #b0adc5;
                                  font-size: 12px;
                                  text-align: center;
                                "
                              >
                                © 2024 TweetStorm. All rights reserved.
                              </p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
  `;
