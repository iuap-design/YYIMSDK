var YYAIAbility = (function () {
    function YYAIAbility() {
        this.dicts = [];
        this.stopKeyword = {"的": 1};

        // 是否启用过滤
        this.isOpenFilter = false;

        // AI分析开关是否启用
        this.isAIAbility = true;

        // 服务器获取最新热词
        // 开关、时间戳
        // 行业
    }

    /**
    * 设置AI分析开关是否启用
    * @param isAIAbility
    */
    YYAIAbility.prototype.openAIAbility = function openAIAbility(isAIAbility) {
        this.isAIAbility = isAIAbility;
    };

    /**
     * 设置是否启用热词过滤
     * @param isOpenFilter
     */
    YYAIAbility.prototype.openFilterWords = function openFilterWords(isOpenFilter) {
        this.isOpenFilter = isOpenFilter;
    };

    /**
     * 设置热词字典
     * @param dicts
     */
    YYAIAbility.prototype.setDictionaries = function setDictionaries(dictArray) {
        if (dictArray) {
            for (var i=0; i < dictArray.length; i++){
                this.dicts.push(dictArray[i]);
            }
        }
    };

    /**
     * 判断消息是否传递给AI分析
     * @returns {boolean}
     */
    YYAIAbility.prototype.intelligentAnalysis = function intelligentAnalysis(keyword) {
        if(!this.isOpenFilter){
            return true;
        }
        if (keyword && this.isAIAbility) {
            var trie = new YYIMAITrie();
            trie.init(this.dicts);
            var result = trie.splitWords(keyword);
            return result.length > 0;
        }
        return false;
    };

    return new YYAIAbility();
})();

var YYIMAITrie = function () {
    function YYIMAITrie() {
        this.root = new YYIMAINode(null);
    }

    /**
     * 将Unicode转成UTF8的三字节
     */
    YYIMAITrie.prototype.toBytes = function toBytes(word) {
        var result = [];
        for (var i = 0; i < word.length; i++) {
            var code = word.charCodeAt(i);
            // 单字节
            if (code < 0x80) {
                result.push(code);
            } else {
                // 三字节
                result = result.concat(this.toUTF8(code));
            }
        }

        return result;
    };

    YYIMAITrie.prototype.toUTF8 = function toUTF8(c) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        // 1110xxxx
        var byte1 = 0xE0 | c >> 12 & 0x0F;
        // 10xxxxxx
        var byte2 = 0x80 | c >> 6 & 0x3F;
        // 10xxxxxx
        var byte3 = 0x80 | c & 0x3F;

        return [byte1, byte2, byte3];
    };

    YYIMAITrie.prototype.toUTF16 = function toUTF16(b1, b2, b3) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        var byte1 = b1 << 4 | b2 >> 2 & 0x0F;
        var byte2 = (b2 & 0x03) << 6 | b3 & 0x3F;
        var utf16 = (byte1 & 0x00FF) << 8 | byte2;

        return utf16;
    };

    /**
     * 添加每个词到YYIMAITrie树
     */
    YYIMAITrie.prototype.add = function add(word) {
        var node = this.root,
            bytes = this.toBytes(word),
            len = bytes.length;
        for (var i = 0; i < len; i++) {
            var c = bytes[i];
            // 如果不存在则添加，否则不需要再保存了，因为共用前缀
            if (!(c in node.childs)) {
                node.childs[c] = new YYIMAINode(c);
            }
            node = node.childs[c];
        }
        node.asWord(); // 成词边界
    };

    /**
     * 按字节在YYIMAITrie树中搜索
     */
    YYIMAITrie.prototype.search = function search(bytes) {
        var node = this.root,
            len = bytes.length,
            result = [];
        var word = [],
            j = 0;
        for (var i = 0; i < len; i++) {
            var c = bytes[i],
                childs = node.childs;
            if (!(c in childs)) {
                return result;
            }

            if (c < 0x80) {
                word.push(String.fromCharCode(c));
            } else {
                j++;
                if (j % 3 == 0) {
                    var b1 = bytes[i - 2];
                    var b2 = bytes[i - 1];
                    var b3 = c;
                    word.push(String.fromCharCode(this.toUTF16(b1, b2, b3)));
                }
            }
            // 如果是停止词，则退出
            if (word.join('') in stop) {
                return result;
            }

            // 成词
            var cnode = childs[c];
            if (cnode.isWord()) {
                cnode.addCount(); // 用于计数判断
                result.push(word.join(''));
            }
            node = cnode;
        }

        return result;
    };

    /**
     * 分词
     */
    YYIMAITrie.prototype.splitWords = function splitWords(words) {
        // 转换成单字节进行搜索
        var bytes = this.toBytes(words);
        var start = 0,
            end = bytes.length - 1,
            result = [];

        while (start != end) {
            var word = [];
            for (var i = start; i <= end; i++) {
                var b = bytes[i]; // 逐个取出字节
                word.push(b);

                var finds = this.search(word);
                if (finds !== false && finds.length > 0) {
                    // 如果在字典中，则添加到分词结果集
                    result = result.concat(finds);
                }
            }
            start++;
        }

        return result;
    };

    /**
     * 初始化整棵YYIMAITrie树
     */
    YYIMAITrie.prototype.init = function init(dict) {
        for (var i = 0; i < dict.length; i++) {
            this.add(dict[i]);
        }
    };

    return YYIMAITrie;
}();

var YYIMAINode = function () {
    function YYIMAINode(_byte) {
        this.childs = {}; // 子节点集合
        this._byte = _byte || null; // 此节点上存储的字节
        this._isWord = false; // 边界保存，表示是否可以组成一个词
        this._count = 0;
    }

    YYIMAINode.prototype.isWord = function isWord() {
        return this._isWord && this._count == 0;
    };

    YYIMAINode.prototype.asWord = function asWord() {
        this._isWord = true;
    };

    YYIMAINode.prototype.addCount = function addCount() {
        this._count++;
    };

    YYIMAINode.prototype.getCount = function getCount() {
        return this._count;
    };

    return YYIMAINode;
}();
