import React from 'react';

function UI_List({
  title,
  icon1, title1, subtitle1,
  icon2, title2, subtitle2,
  icon3, title3, subtitle3,
  icon4, title4, subtitle4,
  mode
}) {
  return (
    <div className="ui-list-container">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-4 sm:gap-y-4 max-w-8xl mx-auto ${
          mode === 'lite'
            ? ''
            : mode === ''
            ? 'lg:grid-cols-4'
            : 'lg:grid-cols-4'
        }`}
      >
        <div className="ui-list-item animate-item text-lightTheme-text dark:text-darkTheme-text my-4">
            <div className="p-4">
                <div className="icon-container">
                    {icon1 && (
                    <div className="bg-palette-gradientLight rounded-md p-3 mb-2 mr-2 md:mr-0 lg:mr-0 inline-block">
                        <i className={`${icon1} text-palette-gradientPrimary text-xl`} />
                    </div>
                    )}
                </div>
                <p className="text-2xl font-medium py-2">{title1}</p>
                <p className="text-sm">{subtitle1}</p>
            </div>
        </div>
        <div className="ui-list-item animate-item text-lightTheme-text dark:text-darkTheme-text my-4">
            <div className="p-4">
            <div className="icon-container">
                {icon2 && (
                <div className="bg-palette-gradientLight rounded-md p-3 mb-2 mr-2 md:mr-0 lg:mr-0 inline-block">
                    <i className={`${icon2} text-palette-gradientPrimary text-xl`} />
                </div>
                )}
            </div>
            <p className="text-2xl font-medium py-2">{title2}</p>
            <p className="text-sm">{subtitle2}</p>
            </div>
        </div>
        <div className="ui-list-item animate-item text-lightTheme-text dark:text-darkTheme-text my-4">
            <div className="p-4">
            <div className="icon-container">
                {icon3 && (
                <div className="bg-palette-gradientLight rounded-md p-3 mb-2 mr-2 md:mr-0 lg:mr-0 inline-block">
                    <i className={`${icon3} text-palette-gradientPrimary text-xl`} />
                </div>
                )}
            </div>
            <p className="text-2xl font-medium py-2">{title3}</p>
            <p className="text-sm">{subtitle3}</p>
            </div>
        </div>
        <div className="ui-list-item animate-item text-lightTheme-text dark:text-darkTheme-text my-4">
            <div className="p-4">
            <div className="icon-container">
                {icon4 && (
                <div className="bg-palette-gradientLight rounded-md p-3 mb-2 mr-2 md:mr-0 lg:mr-0 inline-block">
                    <i className={`${icon4} text-palette-gradientPrimary text-xl`} />
                </div>
                )}
            </div>
            <p className="text-2xl font-medium py-2">{title4}</p>
            <p className="text-sm">{subtitle4}</p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default UI_List;
