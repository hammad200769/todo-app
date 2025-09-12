type Props = {
  passwordResetLink: string;
  homeAddressLink: string;
};

export const resetPasswordEmailTemplate = ({
  passwordResetLink,
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
                  target="_blank"
                  data-saferedirecturl="https://www.google.com/url?q=${homeAddressLink}&amp;source=gmail&amp;ust=1709262059606000&amp;usg=AOvVaw2PldKr7IKMTmdrW4bfV_rV"
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
                  class="m_-4390355623787663608inner-body"
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
                          You are receiving this email because we received a
                          password reset request for your account.
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
                                                <a
                                                  href="${passwordResetLink}"
                                                  class="m_-4390355623787663608button"
                                                  rel="noopener"
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
                                                    border-radius: 4px;
                                                    color: #fff;
                                                    display: inline-block;
                                                    overflow: hidden;
                                                    text-decoration: none;
                                                    background-color: #2d3748;
                                                    border-bottom: 8px solid
                                                      #2d3748;
                                                    border-left: 18px solid
                                                      #2d3748;
                                                    border-right: 18px solid
                                                      #2d3748;
                                                    border-top: 8px solid
                                                      #2d3748;
                                                  "
                                                  target="_blank"
                                                  data-saferedirecturl="https://www.google.com/url?q=${passwordResetLink}&amp;source=gmail&amp;ust=1709262059606000&amp;usg=AOvVaw1M7GvAgtotT2BGix6I-BLf"
                                                  >Reset Password</a
                                                >
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
                          This password reset link will expire in 60
                          minutes.
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
                          If you did not request a password reset, no
                          further action is required.
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

                        <table
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
                            border-top: 1px solid #e8e5ef;
                            margin-top: 25px;
                            padding-top: 25px;
                          "
                        >
                          <tbody>
                            <tr>
                              <td
                                style="
                                  box-sizing: border-box;
                                  font-family: -apple-system,
                                    BlinkMacSystemFont, 'Segoe UI', Roboto,
                                    Helvetica, Arial, sans-serif,
                                    'Apple Color Emoji', 'Segoe UI Emoji',
                                    'Segoe UI Symbol';
                                "
                              >
                                <p
                                  style="
                                    box-sizing: border-box;
                                    font-family: -apple-system,
                                      BlinkMacSystemFont, 'Segoe UI', Roboto,
                                      Helvetica, Arial, sans-serif,
                                      'Apple Color Emoji', 'Segoe UI Emoji',
                                      'Segoe UI Symbol';
                                    line-height: 1.5em;
                                    margin-top: 0;
                                    text-align: left;
                                    font-size: 14px;
                                  "
                                >
                                  If you're having trouble clicking the
                                  "Reset Password" button, copy and paste
                                  the URL below into your web browser:
                                  <span
                                    style="
                                      box-sizing: border-box;
                                      font-family: -apple-system,
                                        BlinkMacSystemFont, 'Segoe UI',
                                        Roboto, Helvetica, Arial, sans-serif,
                                        'Apple Color Emoji',
                                        'Segoe UI Emoji', 'Segoe UI Symbol';
                                      word-break: break-all;
                                    "
                                    ><a
                                      href="${passwordResetLink}"
                                      style="
                                        box-sizing: border-box;
                                        font-family: -apple-system,
                                          BlinkMacSystemFont, 'Segoe UI',
                                          Roboto, Helvetica, Arial,
                                          sans-serif, 'Apple Color Emoji',
                                          'Segoe UI Emoji',
                                          'Segoe UI Symbol';
                                        color: #3869d4;
                                      "
                                      target="_blank"
                                      data-saferedirecturl="https://www.google.com/url?q=http://localhost:8000/reset-password/709f8ff28bdb0026cfba3a487ed12851c167a02d6a5e29b82aae3d57730e07c6?email%3Dtaharohail77%2540gmail.com&amp;source=gmail&amp;ust=1709262059606000&amp;usg=AOvVaw1M7GvAgtotT2BGix6I-BLf"
                                      >
                                      ${passwordResetLink}
                                      </a></span
                                  >
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
                  class="m_-4390355623787663608footer"
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
