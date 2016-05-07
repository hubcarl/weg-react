/** 
 * utils 
 * Description：xxxx
 * Created by sky on 16/5/7
 * Copyright (c) 2016 sky All Rights Reserved
 */

function filter(str, include, exclude) {
// pattern处理，若不为正则则调用glob处理生成正则
    function normalize(pattern) {
        var type = toString.call(pattern);
        switch (type) {
            case '[object String]':
                return _.glob(pattern);
            case '[object RegExp]':
                return pattern;
            default:
                fis.log.error('invalid regexp [%s].', pattern);
        }
    }
// 判断str是否符合patterns中的匹配规则
    function match(str, patterns) {
        var matched = false;
        if (!_.is(patterns, 'Array')) {
            patterns = [patterns];
        }
        patterns.every(function(pattern) {
            if (!pattern) {
                return true;
            }
            matched = matched || str.search(normalize(pattern)) > -1;
            return !matched;
        });
        return matched;
    }

    var isInclude, isExclude;

    if (include) {
        isInclude = match(str, include);
    } else {
        isInclude = true;
    }

    if (exclude) {
        isExclude = match(str, exclude);
    }

    return isInclude && !isExclude;
};
