
class YYIMAINode {
    constructor(_byte){
        this.childs = {}; // 子节点集合
        this._byte = _byte || null; // 此节点上存储的字节
        this._isWord = false; // 边界保存，表示是否可以组成一个词
        this._count = 0;
    }
    isWord() {
        return this._isWord && this._count == 0;
    }
    asWord() {
        this._isWord = true;
    }
    addCount() {
        this._count++;
    }
    getCount() {
        return this._count;
    }
}

class YYIMAITrie {
    constructor(){
        this.root = new YYIMAINode(null);
    }
     /**
     * 将Unicode转成UTF8的三字节
     */
    toBytes(word) {
        let result = [];
        for (let i = 0; i < word.length; i++) {
            let code = word.charCodeAt(i);
            // 单字节
            if (code < 0x80) {
                result.push(code);
            } else {
                // 三字节
                result = result.concat(this.toUTF8(code));
            }
        }
        return result;
    }
    toUTF8(c) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        // 1110xxxx
        let byte1 = 0xE0 | c >> 12 & 0x0F;
        // 10xxxxxx
        let byte2 = 0x80 | c >> 6 & 0x3F;
        // 10xxxxxx
        let byte3 = 0x80 | c & 0x3F;

        return [byte1, byte2, byte3];
    }
    toUTF16(b1, b2, b3) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        let byte1 = b1 << 4 | b2 >> 2 & 0x0F;
        let byte2 = (b2 & 0x03) << 6 | b3 & 0x3F;
        let utf16 = (byte1 & 0x00FF) << 8 | byte2;

        return utf16;
    }
    /**
     * 添加每个词到YYIMAITrie树
     */
    add(word) {
        let node = this.root,
            bytes = this.toBytes(word),
            len = bytes.length;
        for (let i = 0; i < len; i++) {
            let c = bytes[i];
            // 如果不存在则添加，否则不需要再保存了，因为共用前缀
            if (!(c in node.childs)) {
                node.childs[c] = new YYIMAINode(c);
            }
            node = node.childs[c];
        }
        node.asWord(); // 成词边界
    }
    /**
     * 按字节在YYIMAITrie树中搜索
     */
    search(bytes) {
        let node = this.root,
            len = bytes.length,
            result = [];
        let word = [],
            j = 0;
        for (let i = 0; i < len; i++) {
            let c = bytes[i],
                childs = node.childs;
            if (!(c in childs)) {
                return result;
            }

            if (c < 0x80) {
                word.push(String.fromCharCode(c));
            } else {
                j++;
                if (j % 3 == 0) {
                    let b1 = bytes[i - 2];
                    let b2 = bytes[i - 1];
                    let b3 = c;
                    word.push(String.fromCharCode(this.toUTF16(b1, b2, b3)));
                }
            }
            // 如果是停止词，则退出
            if (word.join('') in stop) {
                return result;
            }

            // 成词
            let cnode = childs[c];
            if (cnode.isWord()) {
                cnode.addCount(); // 用于计数判断
                result.push(word.join(''));
            }
            node = cnode;
        }

        return result;
    }
    /**
     * 分词
     */
    splitWords(words) {
        // 转换成单字节进行搜索
        let bytes = this.toBytes(words);
        let start = 0,
            end = bytes.length - 1,
            result = [];

        while (start != end) {
            let word = [];
            for (let i = start; i <= end; i++) {
                let b = bytes[i]; // 逐个取出字节
                word.push(b);

                let finds = this.search(word);
                if (finds !== false && finds.length > 0) {
                    // 如果在字典中，则添加到分词结果集
                    result = result.concat(finds);
                }
            }
            start++;
        }

        return result;
    }
    /**
     * 初始化整棵YYIMAITrie树
     */
    init(dict) {
        for (let i = 0; i < dict.length; i++) {
            this.add(dict[i]);
        }
    }
}

class YYAIAbility {
    constructor(){
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
    openAIAbility(isAIAbility){
        this.isAIAbility = isAIAbility;
    }
     /**
     * 设置是否启用热词过滤
     * @param isOpenFilter
     */
    openFilterWords(isOpenFilter){
        this.isOpenFilter = isOpenFilter;
    }
    /**
     * 设置热词字典
     * @param dicts
     */
    setDictionaries(dictArray){
        if (dictArray) {
            for (let i=0; i < dictArray.length; i++){
                this.dicts.push(dictArray[i]);
            }
        }
    }
    /**
     * 判断消息是否传递给AI分析
     * @returns {boolean}
     */
    intelligentAnalysis(keyword) {
        if(!this.isOpenFilter){
            return true;
        }
        if (keyword && this.isAIAbility) {
            let trie = new YYIMAITrie();
            trie.init(this.dicts);
            let result = trie.splitWords(keyword);
            return result.length > 0;
        }
        return false;
    }
}

export default new YYAIAbility();




