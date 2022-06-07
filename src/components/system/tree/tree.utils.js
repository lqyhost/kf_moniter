export function getEditContent(h, data, node) {
  let self = this;
  return (
    <span class="ly-visible">
      <el-button
        size="mini"
        type="text"
        on-click={() => self.close(data, node)}
      >
        取消
      </el-button>
      <el-button
        size="mini"
        type="text"
        on-click={() => self.editMsg(data, node)}
      >
        确认
      </el-button>
    </span>
  );
}

export function getDefaultContent(h, data, node) {
  let self = this;
  return (
    <div class="ly-visible">
      {data.level == 1 && (
        <span>
            <el-tooltip
                class="item"
                effect="dark"
                content="新建文件夹"
                placement="top-start"
            >
                <el-button
                    icon="el-icon-plus"
                    size="mini"
                    type="primary"
                    on-click={() => self.append(node, data)}
                ></el-button>
            </el-tooltip>
            <el-tooltip
                class="item"
                effect="dark"
                content="上传文件"
                placement="top-start"
            >
                <el-button
                    icon="el-icon-upload"
                    size="mini"
                    type="primary"
                    on-click={() => self.upDataFile(node, data)}
                ></el-button>
            </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="重命名"
            placement="top-start"
          >
            <el-button
              icon="el-icon-edit"
              size="mini"
              type="primary"
              on-click={() => self.update(node, data)}
            ></el-button>
          </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top-start"
            >
              <el-button
                icon="el-icon-delete"
                size="mini"
                type="danger"
                on-click={() => self.remove(node, data)}
              ></el-button>
            </el-tooltip>
        </span>
      )}
        {data.level !== 1 && (
            <span>
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="重命名"
                    placement="top-start"
                >
                    <el-button
                        icon="el-icon-edit"
                        size="mini"
                        type="primary"
                        on-click={() => self.update(node, data)}
                    ></el-button>
                </el-tooltip>
                <el-tooltip
                    class="item"
                    effect="dark"
                    content="删除"
                    placement="top-start"
                >
                    <el-button
                        icon="el-icon-delete"
                        size="mini"
                        type="danger"
                        on-click={() => self.remove(node, data)}
                    ></el-button>
                </el-tooltip>
            </span>
        )}
    </div>
  );
}
