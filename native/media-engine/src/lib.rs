// Rust音视频处理引擎

pub mod decode;
pub mod encode;
pub mod filter;

pub struct MediaEngine {
    // TODO: 实现音视频处理核心
}

impl MediaEngine {
    pub fn new() -> Self {
        MediaEngine {}
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_engine_creation() {
        let _engine = MediaEngine::new();
    }
}
